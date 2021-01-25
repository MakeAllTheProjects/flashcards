const bcrypt = require('bcrypt')

const connection = require('./connection')
const {
	fetchUserByUsernameQuery,
	fetchUserByEmailQuery,
	validatePasswordQuery,
	createUserQuery,
	fetchValidatedUserQuery
} = require('./AuthQueries')

const saltRounds = 10

let authDB = {}

authDB.validateByUsername = ( user ) => {
	return new Promise(( resolve, reject ) => {
		connection.query(
			fetchUserByUsernameQuery,
			[user.username],
			( err, results ) => {
				if ( err ) {
					console.error(err)
					return reject(err)
				}
				return results.length > 0 ? resolve(true) : resolve(false)
			}
		)
	})
}

authDB.validateByEmail = ( user ) => {
	return new Promise(( resolve, reject ) => {
		connection.query(
			fetchUserByEmailQuery,
			[user.email],
			( err, results ) => {
				if ( err ) {
					console.error(err)
					return reject(err)
				}
				return results.length > 0 ? resolve(true) : resolve(false)
			}
		)
	})
}

authDB.signup = ( user ) => {
	return new Promise(( resolve, reject ) => {
		bcrypt.hash( user.password, saltRounds )
			.then(function( hash ) {
				connection.query(
					createUserQuery,
					[
						user.username.toLowerCase(),
						user.firstname,
						user.lastname,
						user.email,
						hash
					],
					( err, results ) => {
						if ( err ) {
							console.error(err)
							return reject(err)
						}

						connection.query(
							fetchValidatedUserQuery,
							[ user.username ],
							( nextErr, nextResults ) => {
								if ( nextErr ) {
									console.error(nextErr)
									return reject(nextErr)
								}

								return resolve({
									id: nextResults[0].id,
									username: nextResults[0].username,
									firstname: nextResults[0].firstname
								})
							}
						)
					}
				)
			})
	})
}

authDB.login = ( user ) => {
	return new Promise(( resolve, reject ) => {
		connection.query(
			validatePasswordQuery,
			[ user.username ],
			async ( err, results ) => {
				if ( err ) {
					console.error(err)
					return reject(err)
				}

				const match = await bcrypt.compare(user.password, results[0].password_hash)

				if ( match === true ) {
					connection.query(
						fetchValidatedUserQuery,
						[ user.username ],
						( nextErr, nextResults ) => {
							if ( nextErr ) {
								console.error(nextErr)
								return reject(nextErr)
							}

							return resolve({
								id: nextResults[0].id,
								username: nextResults[0].username,
								firstname: nextResults[0].firstname
							})
						}
					)
				} else {
					return resolve(false)
				}
			}
		)
	})
}

module.exports = authDB
