const cors = require('cors')
const express = require('express')
const expressJwt = require('express-jwt')

const app = express()

require('dotenv').config()

app.use(express.json())
app.use(cors())

app.use('/auth', require('./routes/auth-router'))

app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use('/api/cards', require('./routes/card-router'))

app.use((err, req, res, next) => {
	if (err) {
		console.error(err)
		if (err.name === 'UnathorizedError') {
			res.status(err.status)
		}
		return res.send({
			message: err.message
		})
	}
})

app.get('/', (req, res) => res.json({
	success: true
}))

app.listen(process.env.SERVER_PORT || 4000, () => console.log(`Listening on port ${process.env.SERVER_PORT}`))