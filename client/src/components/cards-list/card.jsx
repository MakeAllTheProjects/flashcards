import React from 'react'
import './card.scss'

export default function Card (props) {
  return (
    <div className='card-container' key={props.key}>
      <p><b>Question:</b> {props.question}</p>
      <p><b>Answer:</b>{props.answer}</p>
    </div>
  )
}