const express = require('express')
const cardDB = require('../db/card-db')

const cardRouter = express.Router()

cardRouter.get('/', async (req, res, next) => {
	try {
		const cards = await cardDB.getCards(req.user.id)

		res.send({
			success: true,
			cards: cards
		})
	} catch (err) {
		console.log(err)
		res.sendStatus(500).json({
			success: false,
			errMessage: err
		})
	}
})

cardRouter.post('/create-card', async (req, res, next) => {
	try {
		const newCard = await cardDB.createCard(req.user.id, req.body.question, req.body.answer)
		const cards = await cardDB.getCards(req.user.id)
		res.send({ 
			success: true,
			cards: [...cards],
			newCardId: newCard.id
		})
	} catch (err) {
		console.log(err)
		res.sendStatus(500).json({
			success: false,
			errMessage: err
		})
	}
})

module.exports = cardRouter
