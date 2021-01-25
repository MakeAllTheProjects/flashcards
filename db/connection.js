const mysql = require('mysql')

let connection

if (process.env.CLEARDB_DATABASE_URL) {
	connection = mysql.createPool(process.env.CLEARDB_DATABASE_URL)
} else {
	connection = mysql.createPool({
		connectionLimit: 10,
		password: process.env.DB_PASSWORD,
		user: process.env.DB_USERNAME,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT
	})
}

function handleDisconnect() {
	if (process.env.CLEARDB_DATABASE_URL) {
		connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL)
	} else {
		connection = mysql.createPool({
			connectionLimit: 10,
			password: process.env.DB_PASSWORD,
			user: process.env.DB_USERNAME,
			database: process.env.DB_DATABASE,
			host: process.env.DB_HOST,
			port: process.env.DB_PORT
		})
	}

	connection.connect(function(err) {
		if (err) {
			console.error('Error when connection to DB:', err)
			setTimeout(handleDisconnect, 2000)
		}
	})

	connection.on('error', function(err) {
		console.error('DB Error: ', err)
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			handleDisconnect()
		} else {
			throw err
		}
	})
}

handleDisconnect()

module.exports = connection