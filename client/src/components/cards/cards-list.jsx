import React from 'react'

import './cards-list.scss'
import Card from './card'
import CardForm from './card-form'

export default function CardsList({ cards, cardsDispatch}) {
  return (
    <section className='cards-list-container'>
      <p className='cards-count'>You have {cards.length > 0 ? cards.length : 'no'} card{cards.length === 1 ? '' : 's'}</p>
      <div className='cards-list'>
        {cards.length > 0 && cards.map(card => {
          return (
            <Card
              key={`card-${card.id}`}
              question={card.question}
              answer={card.answer}
              cardId={card.id}
              cardsDispatch={cardsDispatch}
              numberOfCards={cards.length}
              cards={cards}
            />
          )
        })}
      </div>
      <CardForm
        cards={cards}
        cardsDispatch={cardsDispatch}
      />
    </section>
  )
}