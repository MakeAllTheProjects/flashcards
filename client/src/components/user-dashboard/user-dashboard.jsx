import React from 'react'
import axios from 'axios'

import { storeAuth } from '../../utils/context/auth-context'

import './user-dashboard.scss'
import Header from '../header/header'

export default function UserDashboard () {
  const authState = React.useContext(storeAuth)
  const { state } = authState
  const [errMessage, setErrorMessage] = React.useState('')
  const [cards, setCards] = React.useState([])

  axios.defaults.timeout = 30000
  const cardsAxios = axios.create({
    headers: {
      Authorization: 'Bearer ' + state.token
    }
  })

  React.useState(() => {
    cardsAxios.get('/api/cards')
      .then(response => {
        if (response.data.message) {
          setErrorMessage(response.data.message)
        }

        setCards([...response.data.cards])
      }).catch(error => {
        console.log(error)
        setErrorMessage(error)
      })
  }, [])

  return (
    <>
      <Header/>
      <main className="user-dashboard">
        <h1>Welcome, {state.user.firstname ? state.user.firstname : "learner"}!</h1>
        <p className='errMessage'>{errMessage}</p>
        <p>{cards.length > 0 ? `${cards.length} cards found` : 'You have no cards'}</p>
      </main>
    </>
  )
}