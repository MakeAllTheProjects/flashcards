import React, { useState, useEffect } from 'react'
import _ from 'lodash'

import './App.scss'
import AppBackground from './components/app-background'

export default function App () {
	return (
		<AppBackground>
			<div className='app-grid'>
				<header className='app-header'>This is a header</header>
				<main className='app-main'>This is the main</main>
			</div>
		</AppBackground>
	)
}