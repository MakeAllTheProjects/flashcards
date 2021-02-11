const connectTagToCardQuery = `
	INSERT INTO flashcourse_card_tags (
		card_id,
		tag_id
	) VALUES (?, ?);
`

const createTagQuery = `
	INSERT INTO flashcourse_tags (
		user_id,
		tag
	) VALUES (?, ?);
`

const editCardTagQuery = `
	UPDATE flashcourse_card_tags
	SET tag_id = ?
	WHERE card_id = ?;
`

const fetchTagsByUserQuery = `
	SELECT
		id,
		tag
	FROM flashcourse_tags
	WHERE user_id = ?;
`

const removeTagFromCardQuery = `
	DELETE FROM flashcourse_card_tags WHERE card_id = ?;
`

const verifyCardHasTagQuery = `
	SELECT
		tag_id
	FROM flashcourse_card_tags
	WHERE card_id = ?;
`

module.exports = {
	connectTagToCardQuery,
	createTagQuery,
	editCardTagQuery,
	fetchTagsByUserQuery,
	removeTagFromCardQuery,
	verifyCardHasTagQuery
}