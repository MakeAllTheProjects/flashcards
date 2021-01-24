const connection = require('./connection')
const { 
	fetchCardsByUserQuery,
	createCardQuery
} = require('./CardQueries')

let cardDB = {}

cardDB.fetchCardsByUser = ( user ) => {
	return new Promise(( resolve, reject ) => {
		connection.query(
			fetchCardsByUserQuery,
			[user.id],
			( err, results ) => {
				if (err) {
					console.error(err)
					return reject(err)
				}

				const cards = results.map(result => ({
					id: result.id,
					question: result.question,
					answer: result.answer
				}))
				
				resolve(cards)
			}
		)
	})
}

cardDB.createCard = (card) => {
	return new Promise (( resolve, reject ) => {
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

				connection.query(
					fetchCardsByUserQuery,
					[ card.userId ],
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
