import React, {
  useEffect,
  useReducer
} from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { UserReducer, initialState } from './UserReducer'

import AppBackground from './components/app-background/AppBackground'
import MessageBanner from './components/MessageBanner'

import CardLibrary from './components/pages/card-library/CardLibrary'
import DemoAccess from './components/pages/demo-access/DemoAccess'
import Landing from './components/pages/landing/Landing'
import NotFound from './components/pages/not-found/NotFound'
import UserDashboard from './components/pages/user-dashboard/UserDashboard'
import WriteCard from './components/pages/write-card/WriteCard'

import './App.scss'

export const baseURL = process.env.REACT_APP_IS_PRODUCTION ? 'https://flash-course.herokuapp.com' : 'http://localhost:8080'

export const GlobalContext = React.createContext()

export default function App () {
  const [ state, dispatch ] = useReducer(UserReducer, initialState)
  const [ cookies, setCookie ] = useCookies(['authToken'])
  const navigate = useNavigate()
  
  useEffect(() => {
    if ( !state.user.username && cookies && cookies.authToken ) {
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
      navigate.push('/user')
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
          {state.message && <MessageBanner />}
          <Routes>
            <Route exact path="/" component={Landing} />
            <Route exact path="/demo" component={DemoAccess} />
            <Route exact path="/user" component={UserDashboard} />
            {/* <ProtectedRoute exact path="/user">
              <UserDashboard/>
            </ProtectedRoute>
            <ProtectedRoute exact path="/user/cards">
              <CardLibrary/>
            </ProtectedRoute>
            <ProtectedRoute exact path="/user/cards/write">
              <WriteCard isEdit={false}/>
            </ProtectedRoute>
            <ProtectedRoute exact path="/user/cards/edit">
              <WriteCard isEdit={true} />
            </ProtectedRoute> */}
            <Route path="*" component={NotFound}/>
          </Routes>
        </div>
      </AppBackground>
    </GlobalContext.Provider>
  )
}
