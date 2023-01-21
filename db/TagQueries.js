const connectTagToCardQuery = `
	INSERT INTO card_tags (
		card_id,
		tag_id
	) VALUES (?, ?);
`

const createTagQuery = `
	INSERT INTO tags (
		user_id,
		tag
	) VALUES (?, ?);
`

const editCardTagQuery = `
	UPDATE card_tags
	SET tag_id = ?
	WHERE card_id = ?;
`

const fetchTagsByUserQuery = `
	SELECT
		id,
		tag
	FROM tags
	WHERE user_id = ?;
`

const removeTagFromCardQuery = `
	DELETE FROM card_tags WHERE card_id = ?;
`

const verifyCardHasTagQuery = `
	SELECT
		tag_id
	FROM card_tags
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