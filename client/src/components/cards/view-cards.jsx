import axios from 'axios'
import React from 'react'
import { navigate } from '@reach/router'
import { useCookies } from 'react-cookie'

import navReducer from '../../utils/nav-reducer'

import './view-cards.scss'
import Card from './card'
import CreateCardForm from './create-card-form'
import Header from '../header'
import MenuSlideOut from '../menu-slide-out'
import NavBar from '../nav-bar'

import CreateCardIcon from '../../assets/svg/sketch-style/089-pen.svg'
import FilterIcon from '../../assets/svg/sketch-style/066-filter.svg'
import ViewCardsIcon from '../../assets/svg/sketch-style/018-layers.svg'

export default function ViewCards () {
  const [cookies] = useCookies(['authToken'])
  const [navState, navDispatch] = React.useReducer(navReducer)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [cards, setCards] = React.useState([])
  const [createCard, setCreateCard] = React.useState(false)

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
        cornerIcon={ViewCardsIcon}
        navState={navState}
        navDispatch={navDispatch}
        title={"Card Library"}
      />
      <main className='main view-cards-container'>
        {!createCard && cards.length > 0 && (
          <div className="card-list-controls">
            {/* <img
              alt="filter"
              className="control-icon"
              title="filter cards"
              src={FilterIcon}
            /> */}
            <img
              alt="create"
              className="control-icon"
              title="create card"
              src={CreateCardIcon}
              onClick={() => setCreateCard(!createCard)}
            />
          </div>
        )}

        {!createCard && (
          cards.length > 0
            ? (
              cards.map(card => (
                <Card
                  key={card.id}
                  answer={card.answer}
                  question={card.question}
                  tags={card.tags}
                />
              ))
            ) : (
              <p>No cards found</p>
            )
          )
        }

        {createCard && (
          <CreateCardForm 
            createCard={createCard}
            setCreateCard={setCreateCard}
            cardsAxios={cardsAxios}
            setCards={setCards}
          />
        )}
      </main>
    </div>
  )
}