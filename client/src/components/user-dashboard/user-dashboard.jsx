
import React from 'react'
import { useCookies } from 'react-cookie'
import { navigate } from '@reach/router'

import userReducer from '../../utils/reducers/user-reducer'

import './user-dashboard.scss'
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
  const { firstname } = userState
  
  React.useEffect(() => {
    try {
      console.log(cookies)
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
    } catch {
      console.log('ERROR')
    }
  }, [cookies])

  console.log(userState)

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
        <p className='errMessage'>{errMessage}</p>
      </main>
    </>
    )
  }
}