const connection = require('./connection')
const {
		connectTagToCardQuery,
		createTagQuery,
		fetchTagsByUserQuery
} = require('./TagQueries')

let tagDB = {}

tagDB.fetchTagsByUser = (user) => {
	return new Promise(( resolve, reject ) => {
		connection.query(
			fetchTagsByUserQuery,
			[user.id],
			( err, results ) => {
				if (err) {
					console.error(err)
					return reject(err)
				}

				const tags = results.map(result => {
					return {
						tagId: result.id,
						tagLabel: result.tag
					}
				})

				resolve(tags)
			}
		)
	})
}

tagDB.createTag = ({userId, tag}) => {
	return new Promise ((resolve, reject) => {
		connection.query(
			createTagQuery,
			[
				userId,
				tag
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

tagDB.connectTagToCard = ({cardId, tagId}) => {
	return new Promise ((resolve, reject) => {
		connection.query(
			connectTagToCardQuery,
			[
				cardId,
				tagId
			],
			(err, results) => {
				if (err) {
					console.error(err)
					return reject(err)
				}

				return resolve(true)
			}
		)
	})
}

module.exports = tagDB
