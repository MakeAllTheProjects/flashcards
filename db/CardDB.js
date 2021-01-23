const connection = require('./connection')
const { 
	fetchCardsByUser
} = require('./CardQueries')

let cardDB = {}

cardDB.fetchCardsByUser = ( user ) => {
	return new Promise(( resolve, reject ) => {
		connection.query(
			fetchCardsByUser,
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

module.exports = cardDB
