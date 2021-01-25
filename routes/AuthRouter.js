const express = require('express')
const jwt = require('jsonwebtoken')
const authDB = require('../db/AuthDB')

const authRouter = express.Router()

authRouter.post('/signup', async (req, res, next) => {
	try {
		const isUser = await authDB.validateByUsername({ username: req.body.username })
		if ( isUser === true ) {
			res.send({
				message: "This username is already in use"
			})
		} else {
			const isEmail = await authDB.validateByEmail({ email: req.body.email })
			if ( isEmail === true ) {
				res.send({
					message: "This email is already in use."
				})
			} else {
				const newUser = await authDB.signup({
					username: req.body.username,
					password: req.body.password,
					email: req.body.email,
					firstname: req.body.firstname,
					lastname: req.body.lastname
				})

				if (newUser === false) {
					res.send({
						message: 'Failed to signup.'
					})
				} else {
					const token = jwt.sign({
						id: newUser.id,
						username: newUser.username,
						firstname: newUser.firstname
					}, process.env.SECRET)

					res.send({
						user: newUser,
						token: token
					})
				}				
			}
		}
	} catch (err) {
		console.error(err)
		res.sendStatus(500).json({
			success: false,
			message: err
		})
	} 
})

authRouter.post('/login', async ( req, res, next ) => {
	try {
		const validateIsUser = await authDB.validateByUsername ({ username: req.body.username })
		
		if ( validateIsUser === false ) {
			res.json({ message: 'Sorry, this username does not seem to be registered.'})
		} else {
			const loginUser = await authDB.login({
				username: req.body.username,
				password: req.body.password
			})

			if ( loginUser === false ) {
				res.json({ message: 'Sorry, this username and password do not seem to match.'})
			} else {
				const token = jwt.sign( loginUser, process.env.SECRET )

				res.json({
					user: loginUser,
					token: token
				})
			}
		}
	} catch ( err ) {
		console.error(err)
		res.sendStatus(500).json({ message: err })
	}
})

module.exports = authRouter
