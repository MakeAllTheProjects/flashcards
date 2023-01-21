import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { baseURL } from '../../../App'
import { GlobalContext } from '../../../App'
import Header from '../../header/Header'
import './UserDashboard.scss'
import BrainIcon from '../../../assets/svg/sticker-style/045-brain-2.svg'
import CardsIcon from '../../../assets/svg/sketch-style/018-layers.svg'

export default function UserDashboard () {
	const context = useContext(GlobalContext)
	const { state, dispatch } = context
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (state.user.id && state.cards.length === 0) {
			const axiosUser = axios.create({
				headers: {
					Authorization: `Bearer ${state.token}`
				}
			})

			axiosUser.get(`${baseURL}/api/cards/user/${state.user.id}`)
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
	}, [state.token])

	return (
		<div className="page user-dashboard">
			<Header
				title={`Welcome ${state.user.firstname}`}
				cornerIcon={BrainIcon}
			/>
			<main className="main not-found-container">
				<section className="card-count">
					<Link to="/user/cards">
						<img 
							className="card-icon"
							alt="cards icon"
							title="cards icon"
							src={CardsIcon}
						/>
					</Link>
					<p>You have {state.cards.length} card{state.cards.length !== 1 ? 's' : ''}.</p>
				</section>
			</main>
		</div>
	)
}
