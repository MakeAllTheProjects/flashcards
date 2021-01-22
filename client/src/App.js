// import axios from 'axios'
import React, {
  useEffect,
  useReducer
} from 'react'
import { Route, Switch } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import AppBackground from './components/app-background/AppBackground'
import Landing from './components/pages/landing/Landing'
import NotAvailable from './components/pages/not-available/NotAvailable'
import NotFound from './components/pages/not-found/NotFound'
import ProtectedRoute from './components/ProtecteRoute'
import UserDashboard from './components/pages/user-dashboard/UserDashboard'

import './App.scss'

export const baseURL = process.env.REACT_APP_IS_PRODUCTION ? 'https://flashcourse.herokuapp.com/api' : 'http://localhost:8080/api'

export const GlobalContext = React.createContext()

const initialState = {
  user: {
    userId: '',
    username: '',
    firstname: ''
  },
  token: '',
  message: ''
}

export const UserReducer = (state, action) => {
  const newState = {...state}

  switch (action.type) {
    case 'LOGIN_SUCCESS':
      newState.user = {
        userId: action.payload.userId,
        username: action.payload.username,
        firstname: action.payload.firstname
      }
      newState.token = action.payload.token
      newState.message = `Welcome, ${action.payload.firstname}!`
      return newState

    case 'LOGIN_FAIL':
      // newState = initialState
      newState.message = action.payload.message
      return newState

    default:
      return state
  }
}

export default function App () {
  const [ state, dispatch ] = useReducer(UserReducer, initialState)
  const [ cookies, setCookie ] = useCookies(['authToken'])

  useEffect(() => {
    if (cookies && cookies.authToken) {
      const user = cookies.authToken.user
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          userId: user.id,
          username: user.username,
          firstname: user.firstname,
          token: cookies.authToken.token
        }
      })
    }
  }, [cookies])

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
            <ProtectedRoute path="/user">
              <UserDashboard/>
            </ProtectedRoute>
            <Route path="*" component={NotFound}/>
          </Switch>
        </div>
      </AppBackground>
    </GlobalContext.Provider>
  )
}
