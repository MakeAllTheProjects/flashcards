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

cardRouter.post('/user/:id', async (req, res, next) => {
	try {
		const cards = await cardDB.createCard({
			userId: req.params.id,
			question: req.body.question,
			answer: req.body.answer
		})

		if (cards.length === 0) {
			res.send({
				cards: [],
				message: 'No cards found.'
			})
		} else {
			res.send({
				cards: cards,
				message: `New card made`
			})
		}
	} catch (err) {
		console.error(err)
		res.sendStatus(500).json({
			message: err
		})
	}
})

cardRouter.put('/:id/user/:userId', async (req, res, next) => {
	try {
		const cards = await cardDB.editCard({
			userId: req.params.userId,
			id: req.params.id,
			question: req.body.question,
			answer: req.body.answer
		})

		if (cards.length === 0) {
			res.send({
				cards: [],
				message: 'No cards found.'
			})
		} else {
			res.send({
				cards: cards,
				message: `Card editted made`
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
