const fetchCardsByUserQuery = `
	SELECT
		flashcourse_cards.id AS id,
		flashcourse_cards.question AS question,
		flashcourse_cards.answer AS answer,
		flashcourse_card_tags.tag_id AS tag_id,
		flashcourse_tags.tag AS tag
	FROM flashcourse_cards
	LEFT JOIN flashcourse_card_tags ON flashcourse_card_tags.card_id = flashcourse_cards.id
	LEFT JOIN flashcourse_tags ON flashcourse_tags.id = flashcourse_card_tags.tag_id
	WHERE flashcourse_cards.user_id = ?
	GROUP BY flashcourse_cards.id;
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
