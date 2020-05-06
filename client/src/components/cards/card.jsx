import axios from 'axios'
import React from 'react'
import { useCookies } from 'react-cookie'

import './card.scss'

export default function Card ({
  question,
  answer,
  cardId,
  cardsDispatch,
  numberOfCards
}) {
  const [cookies] = useCookies(['authToken'])

  axios.defaults.timeout = 3000

	const cardsAxios = axios.create({
		headers: {
			Authorization: `Bearer ${cookies.authToken.token}`
		}
  })

  async function handleDeleteCard () {
    try {
      await cardsAxios.delete(`/api/cards/${cardId}`)
        .then (response => {
          if (response.data.cards.length < numberOfCards) {
            cardsDispatch({
              type: 'FETCH_USER_CARDS',
              cards: [...response.data.cards]
            })
          }
        })
        .catch(err => {
          console.error(err)
        })
    } catch (err) {
      console.error(err)
    }
  }
  
  return (
    <article className='card'>
      <p><b>QUESTION:</b> {question}</p>
      <p><b>ANSWER:</b> {answer}</p>
      <div className='card-actions-container'>
        <button
          className='delete-card-button'
          onClick={() => handleDeleteCard(cardId)}
        >
          Delete Card
        </button>
        <span>Card # {cardId}</span>
      </div>
    </article>
  )
}