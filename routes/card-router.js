const express = require('express')
const { cardDB, tagDB } = require('../db/card-db')

const cardRouter = express.Router()

const mapCards = (cardsData) => {
	if (cardsData.length > 0) {
		const cards = cardsData.map(card => {
			const cardTagsData = JSON.parse(card.tags)
			const cardAttemptsData = JSON.parse(card.attempts)

			let cardTags = []
			if (cardTagsData.length > 0) {
				cardTags = cardTagsData.map(tag => {
					return {
						id: tag.tagId,
						name: tag.tagName
					}
				})
			}

			let cardAttempts = []
			if (cardAttemptsData[0].attemptId > 0) {
				cardAttempts = cardAttemptsData.map(attempt => {
					return {
						id: attempt.attemptId,
						success: attempt.success,
						timestamp: attempt.attemptTimestamp
					}
				})
			}

			return {
				id: card.id,
				answer: card.answer,
				question: card.question,
				tags: cardTags,
				attempts: cardAttempts.sort(function (a, b) { return a - b })
			}
		})
		return cards
	} else {
		return []
	}
}

cardRouter.get('/user/:id', async (req, res, next) => {
	try {
		const cardsData = await cardDB.getCards(req.user.id)

		const cards = await mapCards(cardsData)

		res.send({
			success: true,
			cards: cards
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

cardRouter.post('/create', async (req, res, next) => {
	try {
		const newCard = await cardDB.createCard(req.user.id, req.body.question, req.body.answer)

		const cardsData = await cardDB.getCards(req.user.id)

		const cards = await mapCards(cardsData)

		res.send({
			success: true,
			newCardId: newCard.id,
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

cardRouter.delete('/:id', async (req, res, next) => {
	try {
		await cardDB.deleteCard(req.params.id)

		const cardsData = await cardDB.getCards(req.user.id)
		const cards = await mapCards(cardsData)

		res.send({
			success: true,
			cards: cards,
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
			const cardsData = await cardDB.getCards(req.user.id)
			const cards = await mapCards(cardsData)
			res.send({
				succuess: true,
				cards: cards,
				updatedCardId: req.body.cardId
			})
		} else {
			res.send({
				success: true,
				cards: [],
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

cardRouter.post(`/attempt/:id`, async (req, res, next) => {
	try {
		const attemptsData = await cardDB.logAttempt(
			req.user.id,
			req.params.id,
			req.body.attemptStatus
		)
		const cards = await mapCards(attemptsData)
		res.send({
			succuess: true,
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

module.exports = cardRouter
