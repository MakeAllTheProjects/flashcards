const express = require('express')
const cors = require('cors')
const expressJwt = require('express-jwt')

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', require('../routes/auth-router'))

app.use((err, req, res, next) => {
	console.log(err)
	if (err.name === 'UnauthorizedError') {
		res.status(err.status)
	}
	return res.send({
		message: err.message
	})
})

app.get('/', (req, res) => {
	res.json({
		success: true
	})
})

app.listen(process.env.PORT || 3000, () => {
	console.log(`Listening on PORT ${process.env.PORT || 3000}`)
})
