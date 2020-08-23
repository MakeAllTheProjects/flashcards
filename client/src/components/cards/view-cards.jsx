import axios from 'axios'
import React from 'react'
import { navigate } from '@reach/router'
import { useCookies } from 'react-cookie'

import navReducer from '../../utils/nav-reducer'

import './view-cards.scss'
import Card from './card'
import Header from '../header'
import NavSlideOut from '../nav-slide-out'

import ViewCardsIcon from '../../assets/svg/sketch-style/018-layers.svg'

export default function ViewCards () {
  const [cookies] = useCookies(['authToken'])
  const [navState, navDispatch] = React.useReducer(navReducer)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [cards, setCards] = React.useState([])

  const cardsAxios = axios.create({
    headers: {
      Authorization: `Bearer ${cookies.authToken.token}`
    }
  })

  React.useEffect(() => {

    navDispatch({ type: 'CLOSE' })
  
    cardsAxios.get(`/api/cards/user/${cookies.authToken.id}`)
      .then(response => {
        setCards(response.data.cards)
      }).catch(err => {
        console.error(err)
        setErrorMessage('Server error. Please try again later.')
      })
  
  }, [])

  React.useEffect(() => {
    if (!cookies.authToken) {
      navigate('/')
    }
  }, [cookies])

  return (
    <div className='page view-cards-page'>
      <NavSlideOut
        navState={navState}
        navDispatch={navDispatch}
      />
      <Header
        cornerIcon={ViewCardsIcon}
        navState={navState}
        navDispatch={navDispatch}
        title={"Card Library"}
      />
      <main className='main view-cards-container'>
        {cards.length > 0
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
        }
      </main>
    </div>
  )
}