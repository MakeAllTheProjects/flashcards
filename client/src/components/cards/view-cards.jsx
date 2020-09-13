import axios from 'axios'
import React from 'react'
import { navigate } from '@reach/router'
import { useCookies } from 'react-cookie'

import navReducer from '../../utils/nav-reducer'

import './view-cards.scss'

import Card from './card'
import CardForm from './card-form'
import Header from '../header'
import MenuSlideOut from '../menu-slide-out'
import NavBar from '../nav-bar'

import EditCardIcon from '../../assets/svg/sketch-style/005-draw.svg'
import ViewCardsIcon from '../../assets/svg/sketch-style/018-layers.svg'

export default function ViewCards () {
  const [cookies] = useCookies(['authToken'])
  const [navState, navDispatch] = React.useReducer(navReducer)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [cards, setCards] = React.useState([])
  const [createCard, setCreateCard] = React.useState(false)
  const [newAnswer, setNewAnswer] = React.useState("")
  const [newQuestion, setNewQuestion] = React.useState("")
  const [canEdit, setCanEdit] = React.useState(false)
  const [currentId, setCurrentId] = React.useState(0)
  const [currentAnswer, setCurrentAnswer] = React.useState("")
  const [currentQuestion, setCurrentQuestion] = React.useState("")

  const cardsAxios = axios.create({
    headers: {
      Authorization: `Bearer ${cookies.authToken.token}`
    }
  })

  const fetchCards = () => {
    cardsAxios.get(`/api/cards/user/${cookies.authToken.id}`)
      .then(response => {
        setCards(response.data.cards)
      }).catch(err => {
        console.error(err)
        setErrorMessage('Server error. Please try again later.')
      })
  }

  const editCard = () => {
    if (currentAnswer !== newAnswer && currentQuestion !== newQuestion) {
      cardsAxios.put(`/api/cards/${currentId}`, 
        {
          question: newQuestion, 
          answer: newAnswer
        }
      ).then(response => {
        setErrorMessage("Card editted!")
        setNewAnswer("")
        setNewQuestion("")
        setCurrentAnswer("")
        setCurrentQuestion("")
        setCurrentId(0)
        setCanEdit(false)
        setCards(response.data.cards)
      }).catch(err => {
        console.error(err)
        setErrorMessage('Server error. Please try again later')
      })
    } else {
      setErrorMessage('No card selected. Cannot edit.')
    }
  }

  const handleOpenEdit = () => {
    setCanEdit(true)
  }

  const handleCancel = () => {
    setNewAnswer("")
    setNewQuestion("")
    setCurrentId(0)
    setCurrentQuestion("")
    setCurrentAnswer("")
    setCanEdit(false)
  }

  React.useEffect(() => {
    navDispatch({ type: 'CLOSE' })
    fetchCards()  
  }, [])

  React.useEffect(() => {
    if (!cookies.authToken) {
      navigate('/')
    }
  }, [cookies])

  return (
    <div className='page view-cards-page'>
      <MenuSlideOut
        navState={navState}
        navDispatch={navDispatch}
      />
      <NavBar/>
      <Header
        cornerIcon={canEdit? EditCardIcon : ViewCardsIcon}
        navState={navState}
        navDispatch={navDispatch}
        title={canEdit ? "Edit Card" : "Card Library"}
      />

      {canEdit ? (
        <CardForm
          setErrorMessage={setErrorMessage}
          formAction={editCard}
          answer={newAnswer}
          setAnswer={setNewAnswer}
          question={newQuestion}
          setQuestion={setNewQuestion}
          handleCancel={handleCancel}
        />
      ) : (
        <main className='main view-cards-container'>
          {!createCard && (
            cards.length > 0
              ? (
                cards.map(card => (
                  <Card
                    key={card.id}
                    cardId={card.id}
                    answer={card.answer}
                    question={card.question}
                    tags={card.tags}
                    setCards={setCards}
                    setErrorMessage={setErrorMessage}
                    newAnswer={newAnswer}
                    setNewAnswer={setNewAnswer}
                    newQuestion={newQuestion}
                    setNewQuestion={setNewQuestion}
                    openEdit={handleOpenEdit}
                    setCurrentId={setCurrentId}
                    setCurrentAnswer={setCurrentAnswer}
                    setCurrentQuestion={setCurrentQuestion}
                  />
                ))
              ) : (
                <p>No cards found</p>
              )
          )
          }
        </main>
      )}
    </div>
  )
}