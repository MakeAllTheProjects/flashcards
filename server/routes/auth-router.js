const express = require('express')
const jwt = require('jsonwebtoken')

const authDB = require('../db/auth-db')

const authRouter = express.Router()

authRouter.post('/signup', async (req, res, next) => {
	try {
		console.log("testing")
		console.log(req.body)
		const checkUsernameAvailability = await authDB.validateByUsername({
			username: req.body.username
		})

		if (checkUsernameAvailability.length > 0) {
			res.json({
				message: "That username is already in use",
				user: {},
				token: null
			})
		} else {
			const checkEmailAvailability = await authDB.validateByEmail({
				email: req.body.email
			})

			if (checkEmailAvailability.length > 0) {
				res.json({
					message: "That email is already in use",
					user: {},
					token: null
				})
			} else {
				const createNewUser = await authDB.createSignUp({
					username: req.body.username,
					firstname: req.body.firstname,
					lastname: req.body.lastname,
					email: req.body.email,
					password: req.body.password
				})

				const userWithoutPassword = {
					id: createNewUser.id,
					username: createNewUser.username,
					firstname: createNewUser.firstname
				}

				const token = jwt.sign(userWithoutPassword, process.env.SECRET)

				res.json({
					message: 'User account successfully created',
					user: userWithoutPassword,
					token: token
				})
			}
		}
	} catch (e) {
		console.log(e)
		res.sendStatus(500).json({
			success: false,
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