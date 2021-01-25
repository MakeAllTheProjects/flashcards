const mysql = require('mysql')

// let connection

// if (process.env.CLEARDB_DATABASE_URL) {
// 	connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL)
// } else {
	// connection = mysql.createPool({
	// 	connectionLimit: 10,
	// 	password: process.env.DB_PASSWORD,
	// 	user: process.env.DB_USERNAME,
	// 	database: process.env.DB_DATABASE,
	// 	host: process.env.DB_HOST,
	// 	port: process.env.DB_PORT
// 	})
// }

const connection = mysql.createPool({
	connectionLimit: 10,
	password: process.env.DB_PASSWORD,
	user: process.env.DB_USERNAME,
	database: process.env.DB_DATABASE,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT
})



module.exports = connection