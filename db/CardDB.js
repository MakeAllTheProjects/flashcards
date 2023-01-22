const connection = require('./connection')
const {
	fetchCardQuery,
	fetchCardsByUserQuery,
	createCardQuery,
	editCardQuery,
	deleteCardQuery
} = require('./CardQueries')
const {
	fetchCardAttemptsByUserQuery
} = require('./AttemptQueries')

let cardDB = {}

cardDB.fetchCardsByUser = (user) => {
	return new Promise((resolve, reject) => {
		connection.query(
			fetchCardsByUserQuery,
			[user.id],
			(err, results) => {
				if (err) {
					console.error(err)
					return reject(err)
				}

				const cards = results.map(result => {
					return {
						id: result.id,
						question: result.question,
						answer: result.answer,
						tags: result.tag_id === null ? [] : [
							{
								tagId: result.tag_id,
								tagLabel: result.tag
							}
						]
					}
				})

				resolve(cards)
			}
		)
	})
}

cardDB.fetchCard = (userId, cardId) => {
	return new Promise((resolve, reject) => {
		connection.query(
			fetchCardQuery,
			[userId, cardId],
			(err, results) => {
				if (err) {
					console.error(err)
					return reject(err)
				}
				resolve(results)
			}
		)
	})
}

cardDB.fetchCardAttemptsByUser = (user) => {
	return new Promise((resolve, reject) => {
		connection.query(
			fetchCardAttemptsByUserQuery,
			[user.id],
			(err, results) => {
				if (err) {
					console.error(err)
					return reject(err)
				}
				resolve(results)
			}
		)
	})
}

cardDB.createCard = (card) => {
	return new Promise((resolve, reject) => {
		connection.query(
			createCardQuery,
			[
				card.userId,
				card.question,
				card.answer
			],
			(err, results) => {
				if (err) {
					console.error(err)
					return reject(err)
				}

				return resolve(results.insertId)
			}
		)
	})
}

cardDB.editCard = (card) => {
	return new Promise((resolve, reject) => {
		connection.query(
			editCardQuery,
			[
				card.question,
				card.answer,
				card.id
			],
			(err, results) => {
				if (err) {
					console.error(err)
					return reject(err)
				}

				connection.query(
					fetchCardsByUserQuery,
					[card.userId],
					(nextErr, nextResults) => {
						if (nextErr) {
							console.error(nextErr)
							return reject(nextErr)
						}
						return resolve(nextResults)
					}
				)
			}
		)
	})
}

cardDB.deleteCard = (card) => {
	return new Promise((resolve, reject) => {
		connection.query(
			deleteCardQuery,
			[card.id],
			(err, results) => {
				if (err) {
					console.error(err)
					return reject(err)
				}

				connection.query(
					fetchCardsByUserQuery,
					[card.userId],
					(nextErr, nextResults) => {
						if (nextErr) {
							console.error(nextErr)
							return reject(nextErr)
						}
						return resolve(nextResults)
					}
				)
			}
		)
	})
}

module.exports = cardDB
