const fetchUserByUsernameQuery = `
	SELECT
		username
	FROM flashcourse_users
	WHERE username = ?;
`

const fetchUserByEmailQuery = `
	SELECT
		email
	FROM flashcourse_users
	WHERE email = ?;
`

const validatePasswordQuery = `
	SELECT
		password_hash
	FROM flashcourse_users
	WHERE username = ?;
`

const createUserQuery = `
	INSERT INTO flashcourse_users (
		username,
		firstname,
		lastname,
		email,
		password_hash
	) VALUES ( ?, ?, ?, ?, ? );
`

const fetchValidatedUserQuery = `
	SELECT
		id,
		username,
		firstname
	FROM flashcourse_users
	WHERE id = ?;
`

module.exports = {
	fetchUserByUsernameQuery,
	fetchUserByEmailQuery,
	validatePasswordQuery,
	createUserQuery,
	fetchValidatedUserQuery
}
