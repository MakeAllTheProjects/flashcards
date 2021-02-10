const express = require('express')
const cardDB = require('../db/CardDB')
const tagDB = require('../db/TagDB')

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
		return
	} catch (err) {
		console.error(err)
		res.sendStatus(500).json({
			message: err
		})
		next()
		return
	}
})

cardRouter.post('/user/:id', async (req, res, next) => {
	try {
		let cards = []
		let tags = []

		const newCard = await cardDB.createCard({
			userId: req.params.id,
			question: req.body.question,
			answer: req.body.answer
		})

		if (newCard > 0) {
			if (req.body.tag.tagId) {
				let tagId
				
				if (req.body.tag.tagId === "new") {
					const newTag = await tagDB.createTag({
						userId: req.params.id,
						tag: req.body.tag.tagLabel
					})

					if (newTag > 0) {
						tagId = newTag
					}					
				} else {
					tagId = req.body.tag.tagId
				}

				const newTags = await tagDB.fetchTagsByUser({id: req.params.id})
				if (newTags.length > 0 ) {
					tags = [...newTags]
				}

				if (tagId) {
					await tagDB.connectTagToCard({
						cardId: newCard,
						tagId: tagId
					})
				}
			}
		}

		const newCards = await cardDB.fetchCardsByUser({
			id: req.params.id
		})

		if (newCards.length > 0) {
			cards = [...newCards]
		}

		res.send({
			cards: cards,
			tags: tags,
			message: cards.length > 0 ? `${cards.length} cards found.` : 'No cards found.'
		})

		return
	} catch (err) {
		console.error(err)
		res.sendStatus(500).json({
			message: err
		})
		next()
		return
	}
})

cardRouter.put('/:id/user/:userId', async (req, res, next) => {
	try {
		let tagId

		if (req.body.tag.tagId === "new") {
			const newTag = await tagDB.createTag({
				userId: req.params.userId,
				tag: req.body.tag.tagLabel
			})
			if (newTag > 0) {
				tagId = newTag
			}					
		} else {
			tagId = req.body.tag.tagId
		}

		await tagDB.editCardTag({
			cardId: req.params.id,
			tagId: tagId
		})

		const cards = await cardDB.editCard({
			userId: req.params.userId,
			id: req.params.id,
			question: req.body.question,
			answer: req.body.answer
		})

		const tags = await tagDB.fetchTagsByUser({
			id: req.params.id
		})

		if (cards.length === 0) {
			res.send({
				cards: [],
				tags: [],
				message: 'No cards found.'
			})
		} else {
			res.send({
				cards: cards,
				tags: tags,
				message: `Card editted made.`
			})
		}
		return
	} catch (err) {
		console.error(err)
		res.sendStatus(500).json({
			message: err
		})
		return
	}
})

cardRouter.delete('/:id/user/:userId', async (req, res, next) => {
	try {
		const cards = await cardDB.deleteCard({
			userId: req.params.userId,
			id: req.params.id
		})

		if (cards.length === 0) {
			res.send({
				cards: [],
				message: 'No cards found.'
			})
		} else {
			res.send({
				cards: cards,
				message: `Card deleted.`
			})
		}
		return
	} catch (err) {
		console.error(err)
		res.sendStatus(500).json({
			message: err
		})
		return
	}
})

module.exports = cardRouter
