import React, { useContext } from 'react'

import { GlobalContext } from '../../../App'
import './UserDashboard.scss'
import Header from '../../header/Header'

export default function UserDashboard () {
	const context = useContext(GlobalContext)
	const { state, dispatch } = context

	return (
		<div className="page user-dashboard">
			<Header
				title="Welcome"
			/>
			<main className="main not-found-container">
				<h2>{state.user.username}</h2>
			</main>
		</div>
	)
}