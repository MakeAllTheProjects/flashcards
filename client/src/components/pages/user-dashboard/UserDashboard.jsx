import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'

import { baseURL } from '../../../App'
import { GlobalContext } from '../../../App'
import './UserDashboard.scss'
import Header from '../../header/Header'

export default function UserDashboard () {
	const context = useContext(GlobalContext)
	const { state, dispatch } = context
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (state.user.id && state.user.id !== 0) {
			axios.get(`${baseURL}/cards/user/${state.user.id}`)
				.then(res => {
					dispatch({
						type: 'FETCH_CARDS_SUCCESS',
						payload: {
							cards: res.data.cards
						}
					})
				})
				.then(() => {
					setIsLoading(false)
				})
				.catch(err => {
					console.error(err)
					dispatch({
						type: 'FETCH_CARDS_FAIL',
						payload: {
							message: 'No cards found.'
						}
					})
					setIsLoading(false)
				})
		}
	}, [state.user.id])

	return (
		<div className="page user-dashboard">
			<Header
				title="Welcome"
			/>
			<main className="main not-found-container">
				<h2>{state.user.username}</h2>
				{isLoading && <p>Loading....</p>}
				{!isLoading && <p>You have {state.cards.length} cards.</p>}
			</main>
		</div>
	)
}