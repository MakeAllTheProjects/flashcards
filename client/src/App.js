import axios from 'axios'
import React, {
  useEffect,
  useReducer
} from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import AppBackground from './components/app-background/AppBackground'
import CardLibrary from './components/pages/card-library/CardLibrary'
import Landing from './components/pages/landing/Landing'
import NotAvailable from './components/pages/not-available/NotAvailable'
import NotFound from './components/pages/not-found/NotFound'
import ProtectedRoute from './components/ProtecteRoute'
import UserDashboard from './components/pages/user-dashboard/UserDashboard'

import './App.scss'

export const baseURL = process.env.REACT_APP_IS_PRODUCTION ? 'https://flashcourse.herokuapp.com' : 'http://localhost:8080'

export const GlobalContext = React.createContext()

const initialState = {
  user: {
    id: '',
    username: '',
    firstname: ''
  },
  cards: [],
  token: '',
  message: ''
}

export const UserReducer = (state, action) => {
  let newState = {...state}

  switch (action.type) {
    case 'LOGIN_SUCCESS':
      newState.user = {
        id: action.payload.id,
        username: action.payload.username,
        firstname: action.payload.firstname
      }
      newState.token = action.payload.token
      newState.message = `Welcome, ${action.payload.firstname}!`
      return newState

    case 'LOGIN_FAIL':
      newState = { ...initialState }
      newState.message = action.payload.message
      return newState

    case 'LOGOUT':
      newState = { ...initialState }
      return newState

    case 'FETCH_CARDS_SUCCESS':
      newState.cards = [...action.payload.cards]
      newState.message = `You have ${action.payload.cards.length} card${action.payload.cards.length > 1 ? 's' : ''}`
      return newState

    case 'FETCH_CARDS_FAIL':
      newState.cards = []
      newState.message = 'No cards found.'
      return newState

    default:
      return state
  }
}

export default function App () {
  const [ state, dispatch ] = useReducer(UserReducer, initialState)
  const [ cookies, setCookie ] = useCookies(['authToken'])
  const history = useHistory()
  
  useEffect(() => {
    if (cookies && cookies.authToken) {
      const user = cookies.authToken.user
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          id: user.id,
          username: user.username,
          firstname: user.firstname,
          token: cookies.authToken.token
        }
      })
    }
  }, [cookies])

  useEffect(() => {
    if (state.token) {
      history.push('/user')
    }
  }, [state.token])

  return (
    <GlobalContext.Provider
      value={{
        state: state,
        dispatch: dispatch
      }}
    >
      <AppBackground>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Landing} />
            <ProtectedRoute exact path="/user">
              <UserDashboard/>
            </ProtectedRoute>
            <ProtectedRoute exact path="/user/cards">
              <CardLibrary/>
            </ProtectedRoute>
            <Route path="*" component={NotFound}/>
          </Switch>
        </div>
      </AppBackground>
    </GlobalContext.Provider>
  )
}
