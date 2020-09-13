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

const fetchCardsQuery = `
	SELECT
		cards.id,
		cards.question,
	cards.answer,
	JSON_ARRAYAGG (
		JSON_OBJECT (
			'tagId', tags.id,
			'tagName', tags.tagName
		)
	) AS 'tags',
	JSON_ARRAYAGG (
		JSON_OBJECT (
			'attemptId', attempts.id,
			'attemptTimestamp', attempts.attempt_timestamp,
			'success', attempts.success
		)
	) AS 'attempts'
	FROM cards
	LEFT JOIN cardTags
		ON cardTags.cardId = cards.id
	LEFT JOIN tags
		ON tags.id = cardTags.tagId
	LEFT JOIN attempts
		ON attempts.card_id = cards.id
	WHERE cards.userId = ?
	GROUP BY cards.id;
`
cardDB.getCards = (userId) => {
	return new Promise((resolve, reject) => {
		pool.query(
			fetchCardsQuery,
			[ userId ],
			(err, results) => {
				if (err) {
					console.error(err)
					return reject(err)
				}
				return resolve(results)
			}
		)
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
		`, 
		[
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

cardDB.logAttempt = (userId, cardId, attemptStatus) => {
	return new Promise((resolve, reject) => {
		pool.query(`
			INSERT INTO attempts (
				user_id,
				card_id,
				success
			) VALUES (?, ?, ?);
		`, 
		[
			userId,
			cardId,
			attemptStatus
		],
		(err, results) => {
			if (err) {
				console.error(err)
				return reject(err)
			}
			
			pool.query(
				fetchCardsQuery,
				[userId],
				(cardErr, cardResults) => {
					if (cardErr) {
						console.error(cardErr)
						return reject(cardErr)
					}
					return resolve(cardResults)
				}
			)
		})
	})
}

module.exports = {cardDB}