import React from 'react'
import { 
  Router,
  navigate,
  Redirect
} from '@reach/router'
import { useCookies } from 'react-cookie'

import userReducer from './utils/reducers/user-reducer'

import './App.scss'

import Landing from './components/visitor-landing/landing'
import NotFound from './components/not-found/not-found'
import UserDashboard from './components/user-dashboard/user-dashboard'

export default function App () {
  const [cookies] = useCookies(['auth-token'])
  const [userState, userDispatch] = React.useReducer(userReducer, {
    id: null,
    username: '',
    firstname: '',
    token: ''
  })

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
        setTimeout(navigate('/home'), 500)
      }
    } catch {
      console.log("ERROR")
    }
  }, [])

  return (
    <div className='App'>
      <Router>
        <NotFound path='*'/>
        <Landing path="/"/>
        <UserDashboard path='/home'/>
      </Router>
    </div>
  )
}
