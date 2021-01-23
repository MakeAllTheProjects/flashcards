const fetchCardsByUser = `
	SELECT
		id,
		question,
		answer
	FROM flashcourse_cards
	WHERE user_id = ?;
`

module.exports = {
	fetchCardsByUser
}
