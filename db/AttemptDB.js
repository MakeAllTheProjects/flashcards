
const connection = require('./connection')
const {
  logCardAttemptQuery,
  fetchCardAttemptsByCardQuery
} = require('./AttemptQueries')

let attemptDB = {}

attemptDB.logCardAttempt = ({ userId, cardId, attempt }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      logCardAttemptQuery,
      [
        userId,
        cardId,
        attempt
      ],
      (err, results) => {
        if (err) {
          console.error(err)
          return reject(err)
        }
        return resolve(results)
      }
    )
  })
}

attemptDB.fetchAttemptByCard = ({ cardId }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      fetchCardAttemptsByCardQuery,
      [cardId],
      (err, results) => {
        if (err) {
          console.error(err)
          return reject(err)
        }
        return resolve(results)
      }
    )
  })
}

module.exports = attemptDB
