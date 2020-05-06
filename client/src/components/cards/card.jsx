import axios from 'axios'
import React from 'react'
import { useCookies } from 'react-cookie'

import './card.scss'
import CardForm from './card-form'

export default function Card ({
  question,
  answer,
  tags,
  cardId,
  cardsDispatch,
  numberOfCards,
  cards,
}) {
  const [cookies] = useCookies(['authToken'])
  const [canEdit, setCanEdit] = React.useState(false)

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
  
  if (canEdit) {
    return (
      <CardForm
        cards={cards}
        cardsDispatch={cardsDispatch}
        canEdit={canEdit}
        setCanEdit={setCanEdit}
        cardId={cardId}
      />
    )
  } else {
    return (
      <article className='card'>
        <div className='card-actions-container'>
          <button
            className='edit-card-button'
            onClick={() => setCanEdit(true)}
          >
            Edit Card
          </button>
          <button
            className='delete-card-button'
            onClick={() => handleDeleteCard(cardId)}
          >
            Delete Card
          </button>
        </div>
        <hr/>
        <p><b>QUESTION:</b> {question}</p>
        <p><b>ANSWER:</b> {answer}</p>
        <hr/>
        <div className='card-tags-container'>
          {tags.length > 0 && tags.map(tag => {
            return (
              <span
                className='card-tag'
                key={`card-${cardId}-${tag.tagId}`}
              >
                {tag.tagName}
              </span>
            )
          })}
        </div>
      </article>
    )
  }
}