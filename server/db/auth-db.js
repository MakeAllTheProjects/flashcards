const bcrypt = require('bcrypt')
const pool = require("../main/pool")

const saltRounds = 10

let authDB = {}

authDB.test = (user) => {
	return new Promise((resolve, reject) => {
		pool.query(`
			SELECT * FROM users WHERE id = 1;
		`)
	}, (err, results) => {
		if (err) {
			return reject(err)
		}
		return resolve(results)
	})
}

module.exports = authDB
