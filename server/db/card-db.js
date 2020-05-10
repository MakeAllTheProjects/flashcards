const mysql = require('mysql')
require('dotenv').config()

const pool = mysql.createPool({
	connectionLimit: 10,
	password: process.env.DB_PASSWORD,
	user: process.env.DB_USERNAME,
	database: process.env.DB_DATABASE,
	host: process.env.DB_HOST_PUBLIC,
	port: process.env.DB_PORT
})

let cardDB = {}
let tagDB = {}

cardDB.getCards = (userId) => {
	return new Promise((resolve, reject) => {
		pool.query(`
			SELECT
				cards.id,
				cards.question,
			cards.answer,
			JSON_ARRAYAGG (
				JSON_OBJECT (
					'tagId', tags.id,
					'tagName', tags.tagName
				)
			) AS 'tags'
			FROM cards
			LEFT JOIN cardTags
				ON cardTags.cardId = cards.id
			LEFT JOIN tags
				ON tags.id = cardTags.tagId
			WHERE cards.userId = ?
			GROUP BY cards.id;
		`,
		[ userId ],
		(err, results) => {
			if (err) {
				console.error(err)
				return reject(err)
			}
			return resolve(results)
		})
	})
}

cardDB.createCard = (userId, question, answer) => {
	return new Promise((resolve, reject) => {
		pool.query(`
			INSERT INTO cards (
				cards.userId,
				cards.question,
				cards.answer
			) VALUES (?, ?, ?);
		`, 
		[
			userId,
			question,
			answer
		],
		(err, results) => {
			if (err) {
				console.error(err)
				return reject(err)
			}
			return resolve(results)
		})
	})
}

cardDB.deleteCard = (cardId) => {
	return new Promise((resolve, reject) => {
		pool.query(`
			DELETE FROM cards
			WHERE cards.id = ?;
		`,
		[ cardId ],
		(err, results) => {
			if (err) {
				console.error(err)
				return reject(err)
			}
			return resolve(results)
		})
	})
}

cardDB.updateCard = (cardId, question, answer) => {
	return new Promise((resolve, reject) => {
		pool.query(`
			UPDATE cards
			SET
				cards.question = ?,
				cards.answer = ?
			WHERE cards.id = ?;
		`, [
			question,
			answer,
			cardId
		],
		(err, results) => {
			if (err) {
				console.error(err)
				return reject(err)
			}
			return resolve(results)
		})
	})
}

tagDB.getTags = (userId) => {
	return new Promise((resolve, reject) => {
		pool.query(`
			SELECT
				tags.id,
				tags.tagName
			FROM tags
			WHERE userId = ?;
		`,
			[userId],
			(err, results) => {
				if (err) {
					console.error(err)
					return reject(err)
				}
				return resolve(results)
			})
	})
}

module.exports = {cardDB, tagDB}