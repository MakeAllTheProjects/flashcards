import React from 'react'
import { Router } from '@reach/router'

import Landing from './components/landing/landing'
import NotFound from './components/not-found'
import UserDashboard from './components/user-dashboard/user-dashboard'

import './App.scss'
import AppBackground from './components/app-background'

export default function App () {	
	return (
		<AppBackground>
			<div className='app-grid'>
				<Router>
          <NotFound path='/not-found' />
					<Landing path='/' />
					<UserDashboard path='/home' />
				</Router>
			</div>
		</AppBackground>
	)
}