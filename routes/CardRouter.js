const express = require('express')
const cardDB = require('../db/CardDB')

const cardRouter = express.Router()

cardRouter.get('/user/:id', async (req, res, next) => {
	try {
		const cards = await cardDB.fetchCardsByUser({ id: req.params.id })
		if (cards.length === 0) {
			res.send({
				cards: [],
				message: 'No cards found.'
			})
		} else {
			res.send({
				cards: cards
			})
		}
	} catch (err) {
		console.error(err)
		res.sendStatus(500).json({
			message: err
		})
	}
})

module.exports = cardRouter
