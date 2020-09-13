import React from 'react'
import { Router } from '@reach/router'

import CreateCard from './components/cards/create-card'
import Landing from './components/landing/landing'
import NotAvailable from './components/not-available'
import NotFound from './components/not-found'
import UserDashboard from './components/user-dashboard/user-dashboard'
import ViewCards from './components/cards/view-cards'

import './App.scss'
import AppBackground from './components/app-background'

export default function App () {	

	return (
		<AppBackground>
			<div className='app-grid'>
				<Router>
          <NotFound path='*' />
					{/* <Landing path='/'/> */}
					<ViewCards path='/' />
					<UserDashboard path='/home' />
					<ViewCards path='/view-cards' />
					<NotAvailable path='/view-decks'/>
					<NotAvailable path='/read-notes'/>
					<CreateCard path='/write-card'/>
					<NotAvailable path='/create-deck'/>
					<NotAvailable path='/write-note'/>
					<NotAvailable path='/study'/>
					<NotAvailable path='/study-stats'/>
				</Router>
			</div>
		</AppBackground>
	)
}