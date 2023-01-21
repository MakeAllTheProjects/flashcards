const fetchCardAttemptsByUserQuery = `
	SELECT
		id,
		card_id,
		attempt,
		timestamp
	FROM card_attempts
	WHERE user_id = ?;
`

const fetchCardAttemptsByCardQuery = `
	SELECT
		id,
		card_id,
		attempt,
		timestamp
	FROM card_attempts
	WHERE card_id = ?;
`

const logCardAttemptQuery = `
  INSERT INTO flashcourse_card_attempts (
    user_id,
    card_id,
    attempt
  ) VALUES (?, ?, ?);
`

module.exports = {
  fetchCardAttemptsByUserQuery,
  fetchCardAttemptsByCardQuery,
  logCardAttemptQuery
}