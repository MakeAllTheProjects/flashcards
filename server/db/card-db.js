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

cardDB.getCards = (userId) => {
	return new Promise((resolve, reject) => {
		pool.query(`
			SELECT 
				cards.id,
				cards.question,
				cards.answer
			FROM cards
			WHERE cards.userId = ?;
		`,
		[ userId ],
		(err, results) => {
			if (err) {
				console.log(err)
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
				console.log(err)
				return reject(err)
			}
			return resolve(results)
		})
	})
}

module.exports = cardDB