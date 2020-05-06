const bcrypt = require('bcrypt')
const mysql = require('mysql')

require('dotenv').config()

const saltRounds = 10

const pool = mysql.createPool({
	connectionLimit: 10,
	password: process.env.DB_PASSWORD,
	user: process.env.DB_USERNAME,
	database: process.env.DB_DATABASE,
	host: process.env.DB_HOST_PUBLIC,
	port: process.env.DB_PORT
})

let authDB = {}

authDB.validateByUsername = (user) => {
	return new Promise((resolve, reject) => {
		pool.query(`
			SELECT
				users.username AS username
			FROM users
			WHERE users.username = ?;
		`, 
		[ user.username ],
		(err, results) => {
			if (err) {
				console.error(err)
				return reject(err)
			}
			return results.length > 0 ? resolve(true) : resolve(false)
		}
	)})
}

authDB.validateByEmail = (user) => {
	return new Promise((resolve, reject) => {
		pool.query(`
			SELECT
				users.email
			FROM users
			WHERE users.email = ?;
		`,
		[ user.email ],
		(err, results) => {
			if (err) {
				console.error(err)
				return reject(err)
			}
			return results.length > 0 ? resolve(true) : resolve(false)
		})
	})
}

authDB.createSignUp = (user) => {
	return new Promise((resolve, reject) => {
		bcrypt.hash(user.password, saltRounds)
			.then(function (hash) {
				pool.query(`
					INSERT INTO users (
						username,
						password,
						email,
						firstname,
						lastname
					) VALUES (?, ?, ?, ?, ?);
				`,
				[
					user.username.toLowerCase(),
					hash,
					user.email,
					user.firstname,
					user.lastname
				],
				(err, results) => {
					if (err) {
						console.error(err)
						return reject(err)
					}

					pool.query(`
						SELECT
							users.id,
							users.username,
							users.firstname
						FROM users
						WHERE users.id = ?;
					`,
					[
						results.insertId
					],
					(err, results) => {
						if (err) {
							return reject(err)
						}

						return resolve({
							id: results[0].id,
							username: results[0].username,
							firstname: results[0].firstname
						})
					})
				}
			)
		})
	})
}

authDB.createLogin = (user) => {
	return new Promise((resolve, reject) => {
		pool.query(`
			SELECT
				users.password
			FROM users
			WHERE users.username = ?;
		`,
		[ user.username ],
		async (err, results) => {
			if (err) {
				console.error(err)
				return reject({
					err,
					errMessage: "ERROR"
				})
			}

			const match = await bcrypt.compare(
				user.password, 
				results[0].password
			)

			if (match === true) {
				pool.query(`
					SELECT
						users.id,
						users.username,
						users.firstname
					FROM users
					WHERE users.username = ?;
				`,
				[ user.username ],
				(err, results) => {
					if (err) {
						console.error(err)
						return reject(err)
					}

					return resolve({
						id: results[0].id,
						username: results[0].username,
						firstname: results[0].firstname
					})
				})
			} else {
				return resolve(false)
			}
		})
	})
}

module.exports = authDB
