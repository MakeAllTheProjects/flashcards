const express = require('express')
const cardDB = require('../db/card-db')

const cardRouter = express.Router()

cardRouter.get('/', async (req, res, next) => {
	try {
		const cards = await cardDB.getCards(req.body.userId)

		if (cards.length === 0) {
			res.send({
				success: true,
				cards: []
			})
		}

		res.send({
			success: true,
			cards: [...cards]
		})
	} catch (e) {
		console.log(e)
		res.sendStatus(500).json({
			success: false,
			errMessage: e
		})
	}
})

module.exports = cardRouter
