import React from 'react'

import './card.scss'

export default function Card (props) {
  const [isFlipped, setIsFlipped] = React.useState(false)
  
  return (
    <div
      className={isFlipped ? "card flipped" : "card"}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="card-content">
        <div className="card-front">
          {props.question}
        </div>
        <div className="card-back">
          {props.answer}
        </div>
      </div>
    </div>
  )
}