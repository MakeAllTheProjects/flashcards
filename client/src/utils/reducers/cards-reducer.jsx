import React from 'react'

export default function cardsReducer (state, action) {
  switch (action.type) {
    case 'FETCH_USER_CARDS':
      return {
        cards: [...action.cards]
      }
    case 'CLEAR_CARDS':
      return {
        cards: []
      }
    default:
      return state
  }
}