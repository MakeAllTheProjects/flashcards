const express = require('express')
const attemptDB = require('../db/AttemptDB')
const cardDB = require('../db/CardDB')
const { cardsFormatter } = require('../utils/CardFormatter')

const attemptRouter = express.Router()

attemptRouter.post('/card/:cardId/user/:userId', async (req, res, next) => {
  try {
    const logAttempt = await attemptDB.logCardAttempt({
      userId: req.params.userId,
      cardId: req.params.cardId,
      attempt: req.body.attempt
    })

    const attempts = await attemptDB.fetchAttemptByCard({ cardId: req.params.cardId })

    res.send({
      attempts: attempts
    })

  } catch (err) {
    console.error(err)
    res.sendStatus(500).json({
      message: err
    })
    next()
    return
  }
})

module.exports = attemptRouter