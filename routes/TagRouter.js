const express = require('express')
const tagDB = require('../db/TagDB')

const tagRouter = express.Router()

tagRouter.get('/user/:id', async (req, res, next) => {
	try {
		const tags = await tagDB.fetchTagsByUser({ id: req.params.id })
		if (tags.length === 0) {
			res.send({
				tags: [],
				message: 'No tags found.'
			})
		} else {
			res.send({
				tags: tags
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

module.exports = tagRouter
