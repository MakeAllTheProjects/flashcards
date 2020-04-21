import axios from 'axios'
import React from 'react'
import { useCookies } from 'react-cookie'

import { storeUser } from '../../utils/context/user-context'

import './user-dashboard.scss'
import Header from '../header/header'

export default function UserDashboard () {
  const [errMessage, setErrorMessage] = React.useState('') 
  const userProvider = React.useContext(storeUser)
  const { state, dispatch } = userProvider

  const [cookies, setCookie] = useCookies(['authToken'])

  axios.defaults.timeout = 30000
  const cardsAxios = axios.create({
    headers: {
      Authorization: 'Bearer ' + cookies.authToken.token
    }
  })

  React.useEffect(() => {
    cardsAxios('/api/cards')
      .then(response => {
        dispatch({ 
          type: 'store cards',
          payload: {
            cards: [...response.data.cards]
          }
        })
      })
  }, [])

  console.log(state)

  return (
    <>
      <Header/>
      <main className="user-dashboard">
        <h1>Welcome, {state.user.firstname ? state.user.firstname : "learner"}!</h1>
        <p className='errMessage'>{errMessage}</p>
        { state.cards.length > 0 
          ? (<p>You have {state.cards.length} cards!</p>)
          : (<p>You have no cards!</p>)
        }
      </main>
    </>
  )
}