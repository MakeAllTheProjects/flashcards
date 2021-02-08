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

const fetchTagsByUserQuery = `
	SELECT
		id,
		tag
	FROM flashcourse_tags
	WHERE user_id = ?;
`

module.exports = {
	connectTagToCardQuery,
	createTagQuery,
	fetchTagsByUserQuery
}