const express = require('express')
const authDB = require('../db/auth-db')

const authRouter = express.Router()

authRouter.get('/test', async (req, res, next) => {
	try {
		res.json({ success: true })
	} catch (e) {
		console.log(e)
		res.sendStatus(500)
	}
})

module.exports = authRouter
