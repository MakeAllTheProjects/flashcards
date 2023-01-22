const fetchCardsByUserQuery = `
	SELECT
		cards.id AS id,
		cards.question AS question,
		cards.answer AS answer,
		card_tags.tag_id AS tag_id,
		tags.tag AS tag,
		cards.user_id as user_id
	FROM cards
	LEFT JOIN card_tags ON card_tags.card_id = cards.id
	LEFT JOIN tags ON tags.id = card_tags.tag_id
	WHERE cards.user_id = ?
	GROUP BY cards.id;
`

const fetchCardQuery = `
	SELECT
		cards.id AS id,
		cards.question AS question,
		cards.answer AS answer,
		card_tags.tag_id AS tag_id,
		tags.tag AS tag,
		cards.user_id as user_id
	FROM cards
	LEFT JOIN card_tags ON card_tags.card_id = cards.id
	LEFT JOIN tags ON tags.id = card_tags.tag_id
	WHERE cards.user_id = ? AND cards.id = ?;
`

const fetchCardAttemptsByUserQuery = `
	SELECT
		card_attempts.id,
		card_attempts.card_id,
		card_attempts.attempt,
		card_attempts.timestamp,
		card_attempts.user_id
	FROM card_attempts
	WHERE card_attempts.user_id = ?;
`

const createCardQuery = `
	INSERT INTO cards (
		cards.user_id,
		cards.question,
		cards.answer
	) VALUES (?, ?, ?);
`

const editCardQuery = `
	UPDATE cards
	SET
		cards.question = ?,
		cards.answer = ?
	WHERE cards.id = ?;
`

const deleteCardQuery = `
	DELETE FROM cards
	WHERE cards.id = ?;
`

module.exports = {
	createCardQuery,
	deleteCardQuery,
	editCardQuery,
	fetchCardsByUserQuery,
	fetchCardQuery,
	fetchCardAttemptsByUserQuery,
}
