// import axios from 'axios'
import React, {
  useEffect,
  useReducer,
  useState
} from 'react'
import { Router } from '@reach/router'
import { useCookies } from 'react-cookie'

import AppBackground from './components/app-background/AppBackground'
import Landing from './components/pages/landing/Landing'
import NotAvailable from './components/pages/not-available/NotAvailable'
import NotFound from './components/pages/not-found/NotFound'

import './App.scss'

export const baseURL = process.env.REACT_APP_IS_PRODUCTION ? 'https://flashcourse.herokuapp.com/api' : 'http://localhost:8080/api'

export const GlobalContext = React.createContext()

const initialUserState = {
  username: '',
  firstname: '',
  token: ''
}

export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      action.payload.setCookie(
        'authToken',
        {
          user: {
            userId: action.payload.userId,
            username: action.payload.username,
            firstname: action.payload.firstname 
          },
          token: action.payload.token
        },
        { path: '/' }
      )

      return {
        userId: action.payload.userId,
        username: action.payload.username,
        firstname: action.payload.firstname,
        token: action.payload.token
      }
    case 'FETCH_FAILED':
      return initialUserState
    case 'SET_FROM_COOKIE':
      return {
        userId: action.payload.userId,
        username: action.payload.username,
        firstname: action.payload.firstname,
        token: action.payload.token
      }
    default:
      return state
  }
}

export default function App () {
  const [ message, setMessage ] = useState('')
  const [ userState, userDispatch ] = useReducer(UserReducer, initialUserState)
  const [ cookies, setCookie ] = useCookies(['authToken'])

  useEffect(() => {
    if (cookies.authToken) {
      userDispatch({
        type: 'SET_FROM_COOKIE',
        payload: {
          userId: cookies.user.id,
          username: cookies.user.username,
          firstname: cookies.user.firstname,
          token: cookies.token
        }
      })
    }
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        message: message,
        setMessage: setMessage,
        userState: userState,
        userDispatch: userDispatch
      }}
    >
      <AppBackground>
        <div className="app">
          <Router>
            <NotFound path='*' />
            <Landing path='/' />
            <NotAvailable path='/home' />
          </Router>
        </div>
      </AppBackground>
    </GlobalContext.Provider>
  )
}
