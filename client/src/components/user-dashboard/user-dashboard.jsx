import axios from 'axios'
import React from 'react'
import { useCookies } from 'react-cookie'

import { storeUser } from '../../utils/context/user-context'

import './user-dashboard.scss'
import Header from '../header/header'
import CardsList from '../cards-list/cards-list'

export default function UserDashboard () {
  const [errMessage, setErrorMessage] = React.useState('')
  const userProvider = React.useContext(storeUser)
  const { state, dispatch } = userProvider

  const [cookies, setCookie] = useCookies(['authToken'])

  axios.defaults.timeout = 30000
  let cardsAxios

  React.useEffect(() => {
    if (cookies.authToken && cookies.authToken.token) {
      cardsAxios = axios.create({
          headers: {
            Authorization: `Bearer ${cookies.authToken.token || state.token}`
          }
        })
    }
  }, [cookies])

  React.useEffect(() => {
    if (cookies.authToken.token && typeof cardsAxios === 'function') {
      cardsAxios('/api/cards')
        .then(async response => {
          await dispatch({
            type: 'store cards',
            payload: {
              cards: [...response.data.cards]
            }
          })
        })
        .catch(err => {
          console.log(err)
          setErrorMessage(err)
        })
    }
  }, [cardsAxios])

  return (
    <>
      <Header title={`Welcome, ${state.user.firstname ? state.user.firstname : "learner"}!`}/>
      <main className="user-dashboard">
        <p className='errMessage'>{errMessage}</p>
        {state.cards.length > 0 && <CardsList />}
      </main>
    </>
  )
}