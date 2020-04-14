const express = require('express')
const jwt = require('jsonwebtoken')

const authDB = require('../db/auth-db')

const authRouter = express.Router()

authRouter.post('/signup', async (req, res, next) => {
	try {
		const isUser = await authDB.validateByUsername({username: req.body.username})
		
		if (isUser === true) {		
			res.send({
				success: true,
				errMessage: "This username is already in use."
			})
		} else {
			const isEmail = await authDB.validateByEmail({email: req.body.email})

			if (isEmail === true) {
				res.send({
					success: true,
					errMessage: "This email is already in use."
				})
			} else {
				const createNewUser = await authDB.createSignUp({
					username: req.body.username,
					password: req.body.password,
					email: req.body.email,
					firstname: req.body.firstname,
					lastname: req.body.lastname
				})

				console.log(createNewUser)

				const token = jwt.sign({
					id: createNewUser.id,
					username: createNewUser.username,
					firstname: createNewUser.firstname
				}, process.env.SECRET)

				res.send({
					success: true,
					errMessage: null,
					user: createNewUser,
					token: token
				})
			}
		}
	} catch (e) {
		console.log(e)
		res.sendStatus(500).json({
			sucess: false,
			errMessage: e
		})
	}
})

authRouter.post('/login', async (req, res, next) => {
	try {
		const validateIsUser = await authDB.validateByUsername({
			username: req.body.username
		})

		if (validateIsUser.errMessage) {
			console.log(validateIsUser.errMessage)
			res.json({
				message: "Server error"
			})
		} else if (validateIsUser.length < 1) {
			res.json({
				message: 'Sorry, this username does not seem to be registered'
			})
		} else {
			const loginUser = await authDB.createLogin({
				username: req.body.username,
				password: req.body.password
			})

			const token = jwt.sign(loginUser, process.env.SECRET)

			res.json({
				message: 'User has successfully been logged in.',
				user: loginUser,
				token: token
			})
		}
	} catch (e) {
		console.log(e)
		res.sendStatus(500).json({
			sucess: false,
			errMessage: e
		})
	}
})

authRouter.get('/', (req, res, next) => {
	try {
		res.json({success: true})
	} catch (e) {
		console.log(e)
		res.sendStatus(500).json({
			sucess: false,
			errMessage: e
		})
	}
})

module.exports = authRouter