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
  const cardsAxios = axios.create({
    headers: {
      Authorization: `Bearer ${cookies.authToken.token || state.token}`
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
  }, [400])

  return (
    <>
      <Header title={`Welcome, ${state.user.firstname ? state.user.firstname : "learner"}!`}/>
      <main className="user-dashboard">
        <p className='errMessage'>{errMessage}</p>
        <CardsList/>
      </main>
    </>
  )
}