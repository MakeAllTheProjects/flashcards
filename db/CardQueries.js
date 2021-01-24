const fetchCardsByUserQuery = `
	SELECT
		id,
		question,
		answer
	FROM flashcourse_cards
	WHERE user_id = ?;
`

const createCardQuery = `
	INSERT INTO flashcourse_cards (
		user_id,
		question,
		answer
	) VALUES (?, ?, ?);
`

const editCardQuery = `
	UPDATE flashcourse_cards
	SET
		question = ?,
		answer = ?
	WHERE id = ?;
`

const deleteCardQuery = `
	DELETE FROM flashcourse_cards
	WHERE id = ?;
`

module.exports = {
	fetchCardsByUserQuery,
	createCardQuery,
	editCardQuery,
	deleteCardQuery
}
