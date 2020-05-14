import React, { useState, useEffect } from 'react'
import {Router} from '@reach/router'

import './App.scss'
import AppBackground from './components/app-background'
import Landing from './components/landing/landing'

export default function App () {
	return (
		<AppBackground>
			<div className='app-grid'>
				<Router>
					<Landing path='/'/>
				</Router>
			</div>
		</AppBackground>
	)
}