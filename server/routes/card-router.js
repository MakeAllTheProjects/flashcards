const express = require('express')
const {cardDB, tagDB} = require('../db/card-db')

const cardRouter = express.Router()

cardRouter.get('/', async (req, res, next) => {
	try {
		const cards = await cardDB.getCards(req.user.id)

		res.send({
			success: true,
			cards: cards || []
		})
	} catch (err) {
		console.error(err)
		res.sendStatus(500).json({
			success: false,
			errMessage: err,
			cards: []
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
		console.error(err)
		res.sendStatus(500).json({
			success: false,
			errMessage: err
		})
	}
})

cardRouter.delete('/:id', async (req, res, next) => {
	try {
		await cardDB.deleteCard(req.params.id)
		
		const cards = await cardDB.getCards(req.user.id)

		res.send({
			success: true,
			cards: [...cards],
			deletedCardId: req.body.cardId
		})
	} catch (err) {
		console.error(err)
		res.sendStatus(500).json({
			success: false,
			errMessage: err
		})
	}
})

cardRouter.put('/:id', async (req, res, next) => {
	try {
		const updateCard = await cardDB.updateCard(req.params.id, req.body.question, req.body.answer)

		if (updateCard.changedRows > 0) {
			const cards = await cardDB.getCards(req.user.id)
			res.send({
				succuess: true,
				cards: [...cards],
				updatedCardId: req.body.cardId
			})
		} else {
			res.send({
				success: true,
				cards: null,
				updatedCardId: null
			})
		}			
	} catch (err) {
		console.error(err)
		res.sendStatus(500).json({
			success: false,
			errMessage: err
		})
	}
})

cardRouter.get('/tags', async (req, res, next) => {
	try {

	} catch (err) {
		console.error(err)
		res.sendStatus(500).json({
			success: false,
			errMessage: err
		})
	}
})

module.exports = cardRouter
