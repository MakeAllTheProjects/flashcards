import React from 'react'

import './card.scss'

export default function Card ({
  question,
  answer
}) {
  return (
    <article className='card'>
      <p><b>QUESTION:</b> {question}</p>
      <p><b>ANSWER:</b> {answer}</p>
    </article>
  )
}