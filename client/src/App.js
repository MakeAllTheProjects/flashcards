// import axios from 'axios'
import React, {
  useReducer,
  useState
} from 'react'
import { Router } from '@reach/router'

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
      return {
        username: action.payload.username,
        firstname: action.payload.firstname,
        token: action.payload.token
      }
    case 'FETCH_FAILED':
      return initialUserState
    default:
      return state
  }
}

export default function App () {
  const [ message, setMessage ] = useState('')
  const [userState, userDispatch ] = useReducer(UserReducer, initialUserState)

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
