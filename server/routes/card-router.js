const express = require('express')
const cardDB = require('../db/card-db')

const cardRouter = express.Router()

cardRouter.get('/', async (req, res, next) => {
	try {
		const cards = await cardDB.getCards(req.user.id)

		res.sendStatus(200).json({
			success: true,
			cards: cards
		})
	} catch (err) {
		console.error(err)
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
		
		res.sendStatus(200).json({ 
			success: true,
			cards: [...cards],
			newCardId: newCard.id
		})
	} catch (err) {
		console.error(err)
		res.sendStatus(500).json({
			success: false,
			errMessage: err
		})
	}
})

cardRouter.delete('/delete-card', async (req, res, next) => {
	try {
		await cardDB.deleteCard(req.body.cardId)
		
		const cards = await cardsDB.getCards(req.user.id)

		res.sendStatus(200).json({
			success: true,
			cards: [...cards]
		})
	} catch (err) {
		console.error(err)
	}
})

module.exports = cardRouter
