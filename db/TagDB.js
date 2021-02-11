const e = require('express')
const connection = require('./connection')
const {
		connectTagToCardQuery,
		createTagQuery,
		editCardTagQuery,
		fetchTagsByUserQuery,
		removeTagFromCardQuery,
		verifyCardHasTagQuery
} = require('./TagQueries')

let tagDB = {}

tagDB.fetchTagsByUser = ( user ) => {
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

tagDB.createTag = ({ userId, tag }) => {
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

tagDB.connectTagToCard = ({ cardId, tagId }) => {
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

tagDB.editCardTag = ({ cardId, tagId }) => {
	return new Promise ((resolve, reject) => {
		connection.query(
			verifyCardHasTagQuery,
			[cardId],
			(err, results) => {
				if (err) {
					console.error(err)
					return reject(err)
				}

				if (results.length > 0) {
					connection.query(
						editCardTagQuery,
						[
							tagId,
							cardId
						],
						(nextErr, nextResults) => {
							if (nextErr) {
								console.error(nextErr)
								return reject(nextResults)
							}
							return resolve(true)
						}
					)
				} else {
					connection.query(
						connectTagToCardQuery,
						[
							cardId,
							tagId
						],
						(nextErr, nextResults) => {
							if (nextErr) {
								console.error(nextErr)
								return reject(nextResults)
							}
							return resolve(true)
						}
					)
				}
			}
		)
	})
}

tagDB.removeTagFromCard = ({cardId}) => {
	return new Promise ((resolve, reject) => {
		connection.query(
			removeTagFromCardQuery,
			[cardId],
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
