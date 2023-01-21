require('dotenv').config()

const cors = require('cors')
const express = require('express')
const expressJwt = require('express-jwt')
const path = require('path')
const serveStatic = require('serve-static')

const attemptRouter = require('./routes/AttemptRouter')
const authRouter = require('./routes/AuthRouter')
const cardRouter = require('./routes/CardRouter')
const tagRouter = require('./routes/TagRouter')

const server = express()

process.on('uncaughtException', function (error) {
	console.error(error.stack);
});

const whitelist = [
	'localhost:3000',
	'localhost:8080',
	process.env.HEROKU_URL
]

const corsOptions = {
	origin: function (origin, callback) {
		console.info("** Origin of request " + origin.headers.host)
		if (whitelist.indexOf(origin.headers.host) !== -1 || !origin) {
			console.info("Origin acceptable")
			callback(null, true)
		} else {
			console.info("Origin rejected")
			callback(new Error('Not allowed by CORS - ' + origin.headers.host))
		}
	}
}

server.use(express.json())
server.use(serveStatic(__dirname + '/client/build'))
server.use(cors(corsOptions.origin))

// Throw away route to use for keeping Heroku app from sleeping on free tier. Remove if upgraded.
server.get('/hello', (req, res, next) => {
	res.send({
		message: 'hello'
	})
})

server.use('/auth', authRouter)

server.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
server.use('/api/attempt', attemptRouter)
server.use('/api/cards', cardRouter)
server.use('/api/tags', tagRouter)

server.use((err, req, res, next) => {
	if (err) {
		console.error(err)
		if (err.name === 'UnauthorizedError') {
			res.status(err.status)
		}
		return res.send({
			message: err.message
		})
	}
})

if (process.env.NODE_ENV === 'production') {
	server.use(express.static(path.join(__dirname, 'client/build')))
	server.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
	});
}

server.listen(
	process.env.PORT || 4000,
	() => console.info(`Server listening on port ${process.env.PORT || 4000}`)
)
