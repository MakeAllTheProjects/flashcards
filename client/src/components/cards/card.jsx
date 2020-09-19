import axios from 'axios'
import React from 'react'
import { useCookies } from 'react-cookie'

import './card.scss'

import AlertIcon from '../../assets/svg/sketch-style/problem.svg'
import DeleteIcon from '../../assets/svg/sketch-style/delete.svg'
import EditIcon from '../../assets/svg/sketch-style/pencil.svg'
import FailureIcon from '../../assets/svg/sticker-style/038-delete.svg'
import SuccessIcon from '../../assets/svg/sticker-style/039-interface-6.svg'
import ViewIcon from '../../assets/svg/sketch-style/show.svg'

export default function Card (props) {
  const [isFlipped, setIsFlipped] = React.useState(false)
  const [cookies] = useCookies(['authToken'])
  const [recentAttempts, setRecentAttempts] = React.useState([])
  const [viewCardDetails, setViewCardDetails] = React.useState(false)

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

  React.useEffect(() => {
    if (props.attempts.length > 0) {
      props.attempts.length <=10
        ? setRecentAttempts(props.attempts)
        : setRecentAttempts(props.attempts.slice(props.attempts.length - 11, props.attempts.length - 1))
    }
  }, [props.attempts])

  const viewCardDetailsPanel = props.attempts.length > 0 && (
    <p className="card-attempts" style={{ opacity: viewCardDetails ? "100%" : "0%" }}>
      <p>{`${Math.round((recentAttempts.filter(function (attempt) { return attempt.success }).length / recentAttempts.length) * 100)}%`}</p>
      <div className="attempt-bar">
        {recentAttempts.map(attempt => <span key={attempt.id} className="attempt-block" style={{ backgroundColor: attempt.success ? "green" : "red"}} />)}
      </div>
    </p>
  )
  
  return (
    <div
      className={isFlipped ? "card flipped" : "card"}
    >
      <div className="card-control-panel">
        {props.answer === "" && (
          <img
            alt="issue with card"
            className="card-alert-icon"
            src={AlertIcon}
            title="issue with card"
          />
        )}
        <img
          alt="view card details"
          className="card-control-icon view"
          onClick={() => setViewCardDetails(!viewCardDetails)}
          src={ViewIcon}
          title="view card details"
        />
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
          <p>{props.question}</p>
          {viewCardDetailsPanel}
        </div>
        <div className="card-back">
          <p>{props.answer}</p>
          <img
            alt="failed attempt"
            className="attempt-icon failure"
            onClick={() => logAttempt(false)}
            src={FailureIcon}
            title="Got the answer wrong!"
          />
          {viewCardDetailsPanel}
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
  )
}