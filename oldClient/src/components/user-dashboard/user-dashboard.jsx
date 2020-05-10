
import axios from 'axios'
import React from 'react'
import { useCookies } from 'react-cookie'
import { navigate } from '@reach/router'

import cardsReducer from '../../utils/reducers/cards-reducer'
import userReducer from '../../utils/reducers/user-reducer'

import './user-dashboard.scss'
import CardList from '../cards/cards-list'
import Header from '../header/header'

export default function UserDashboard () {
  const [ cookies ] = useCookies(['authToken'])
  const [ errMessage, setErrorMessage ] = React.useState('')
  const [ userState, userDispatch ] = React.useReducer(userReducer, {
    id: null,
    username: '',
    firstname: '',
    token: ''
  }) 
  const [ cardsState, cardsDispatch ] = React.useReducer(cardsReducer, {
    cards: []
  })

  axios.defaults.timeout = 3000
  
  React.useEffect(() => {
    try {
      if (cookies.authToken && cookies.authToken.token) {
        userDispatch({
          type: 'LOGIN',
          id: cookies.authToken.user.id,
          username: cookies.authToken.user.username,
          firstname: cookies.authToken.user.firstname,
          token: cookies.authToken.token
        })
      } else {
        userDispatch({
          type: 'LOGOUT'
        })
        setTimeout(navigate('/'))
      }
    } catch (err) {
      console.error(err)
    }
  }, [cookies])

  React.useEffect(() => {
    if (userState && userState.token) {
      try {
        const cardsAxios = axios.create({
          headers: {
            Authorization: `Bearer ${userState.token}`
          }
        })

        cardsAxios('/api/cards')
          .then(response => {
            cardsDispatch({
              type: 'FETCH_USER_CARDS',
              cards: [...response.data.cards]
            })
          })
          .catch(err => {
            console.error(err)
            setErrorMessage('A server error has occured')
          })
      } catch (err) {
        console.error(err)
      }
    } else {
      cardsDispatch({type: 'CLEAR_CARDS'})
    }
  }, [userState])

  function handleRefresh () {
    try {
      const cardsAxios = axios.create({
        headers: {
          Authorization: `Bearer ${userState.token}`
        }
      })

      cardsAxios('/api/cards')
        .then(response => {
          cardsDispatch({
            type: 'FETCH_USER_CARDS',
            cards: [...response.data.cards]
          })
        })
        .catch(err => {
          console.error(err)
          setErrorMessage('A server error has occured')
        })
    } catch (err) {
      console.error(err)
    }
  }

  if (userState && userState.firstname === undefined) {
    return (
      <main className='loading'>
        <h1>Loading, please wait...</h1>
      </main>
    )
  } else {
    return (
      <>
      <Header title={`Welcome, ${userState.firstname ? userState.firstname : 'learner'}!`}/>
      <main className="user-dashboard">
        <span onClick={() => handleRefresh()}>REFRESH CARDS</span>
        <p className='errMessage'>{errMessage}</p>
          {cardsState.cards && (
            <CardList cards={[...cardsState.cards] || []} cardsDispatch={cardsDispatch}/>
          )}
      </main>
    </>
    )
  }
}