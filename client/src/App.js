import React, { useEffect, useReducer } from 'react'
import { Router, navigate, Redirect } from '@reach/router'
import { useCookies } from 'react-cookie'

import userReducer from './utils/user-reducer'

import UserDashboard from './components/user-dashboard/user-dashboard'
import Landing from './components/landing/landing'

import './App.scss'
import AppBackground from './components/app-background'


export default function App () {
	const [cookies] = useCookies(['auth-token'])	
	const [userState, userDispatch] = useReducer(userReducer)

	useEffect(() => {
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
    } catch (err) {
      console.error(err)
    }
	}, [])
	
	return (
		<AppBackground>
			<div className='app-grid'>
				<Router>
					<Landing path='/'/>
					<UserDashboard path='/home' />
				</Router>
			</div>
		</AppBackground>
	)
}