const cardsFormatter = (cardsData, attempts) => {
  const cards = cardsData.map(card => {
    const cardAttempts = attempts.filter(attempt => attempt.card_id === card.id).map(attempt => ({
      attempt_id: attempt.id,
      success: attempt.attempt,
      timestamp: attempt.timestamp
    })).sort((x, y) => y.timestamp - x.timestamp)

    return {
      ...card,
      attempts: cardAttempts
    }
  })

  return cards
}

module.exports = {
  cardsFormatter
}
