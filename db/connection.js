const mysql = require('mysql')

const connection = mysql.createConnection(process.env.JAWSDB_URL)

// const connection = mysql.createPool({
// 	connectionLimit: 10,
// 	password: process.env.DB_PASSWORD,
// 	user: process.env.DB_USERNAME,
// 	database: process.env.DB_DATABASE,
// 	host: process.env.DB_HOST,
// 	port: process.env.DB_PORT
// })

module.exports = connection