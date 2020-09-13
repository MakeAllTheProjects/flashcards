import axios from 'axios'
import React from 'react'
import { useCookies } from 'react-cookie'

import './card.scss'

import DeleteIcon from '../../assets/svg/sketch-style/delete.svg'
import EditIcon from '../../assets/svg/sketch-style/pencil.svg'
import FailureIcon from '../../assets/svg/sticker-style/038-delete.svg'
import SuccessIcon from '../../assets/svg/sticker-style/039-interface-6.svg'

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

  const logAttempt = (attemptValue) => {
    cardsAxios.post(
      `/api/cards/attempt/${props.cardId}`, 
      { attemptStatus: attemptValue }
    ).then(response => {
      props.setCards(response.data.cards)
    }).catch(err => {
      console.error(err)
      props.setErrorMessage("Server error. Please try again later.")
    })
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
          <div className="attempt-panel">
            <img
              alt="failed attempt"
              className="attempt-icon failure"
              onClick={() => logAttempt(false)}
              src={FailureIcon}
              title="Got the answer wrong!"
            />
            {props.attempts.length > 0 && (
              <p className="card-attempts">
                { props.attempts.length <= 10
                  ? `${Math.round((props.attempts.filter(function (attempt) { return attempt.success }).length / (props.attempts.length <= 10 ? props.attempts.length : 10)) * 100)}%`
                  : `${Math.round((props.attempts.slice(props.attempts.length - 11, props.attempts.length - 1).filter(function (attempt) { return attempt.success }).length / (props.attempts.length <= 10 ? props.attempts.length : 10)) * 100)}%`
                }
              </p>
            )}
            <img
              alt="success attempt"
              className="attempt-icon success"
              onClick={() => logAttempt(true)}
              src={SuccessIcon}
              title="Got the answer right!"
            />
          </div>
        </div>
      </div>
    </div>
  )
}