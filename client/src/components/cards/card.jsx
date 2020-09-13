import axios from 'axios'
import React from 'react'
import { useCookies } from 'react-cookie'

import './card.scss'

import DeleteIcon from '../../assets/svg/sketch-style/delete.svg'
import EditIcon from '../../assets/svg/sketch-style/pencil.svg'

export default function Card (props) {
  const [isFlipped, setIsFlipped] = React.useState(false)
  const [cookies] = useCookies(['authToken'])

  const cardsAxios = axios.create({
    headers: {
      Authorization: `Bearer ${cookies.authToken.token}`
    }
  })

  const handleDeleteCard = () => {
    cardsAxios.delete(`/api/cards/${props.cardId}`)
      .then(response => {
        props.setCards(response.data.cards)
      }).catch(err => {
        console.error(err)
        props.setErrorMessage("Server error. Please try again later.")
      })
  }

  const handleEditCard = () => {
    props.setCurrentId(props.cardId)
    props.setCurrentAnswer(props.answer)
    props.setCurrentQuestion(props.question)
    props.setNewAnswer(props.answer)
    props.setNewQuestion(props.question)
    props.openEdit()
  }
  
  return (
    <div
      className={isFlipped ? "card flipped" : "card"}
    >
      <div className="card-control-panel">
        <img
          alt="edit card"
          className="card-control-icon edit"
          onClick={() => handleEditCard()}
          src={EditIcon}
          title="edit card"
        />
        <img 
          alt="delete card"
          className="card-control-icon delete"
          onClick={() => handleDeleteCard()}
          src={DeleteIcon}
          title="delete card"
        />
      </div>

      <div
        className="card-content"
        onClick={() => setIsFlipped(!isFlipped)}
      >
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