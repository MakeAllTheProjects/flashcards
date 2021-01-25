import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'

import { GlobalContext, baseURL } from '../../../App'
import Header from '../../header/Header'
import './DemoAccess.scss'

export default function DemoAccess () {
	const context = useContext(GlobalContext)
	const { state, dispatch } = context
	const [cookies, setCookie] = useCookies(['authToken'])
	const history = useHistory()
	const [demoLoadingMessage, setDemoLoadingMessage] = useState("Please wait while the demo is loading...")

	useEffect(() => {
		console.log(process.env.REACT_APP_DEMO_USER)
		axios.post(`${baseURL}/auth/login`, {
			username: 'demo',
			password: 'demodemo'
		})
			.then(res => {
				dispatch({
					type: 'LOGIN_SUCCESS',
					payload: {
						id: res.data.user.id,
						username: res.data.user.username,
						firstname: res.data.user.firstname,
						token: res.data.token
					}
				})
				return res.data
			})
			.then(data => {
				setCookie(
					'authToken',
					{
						user: {
							id: data.user.id,
							username: data.user.username,
							firstname: data.user.firstname
						},
						token: data.token
					},
					{ path: '/' }
				)
			})
			.then(() => {
				history.push('/user')
			})
			.catch(err => {
				console.error(err)
				dispatch({
					type: 'LOGIN_FAIL',
					payload: {
						message: 'Authorization failed.'
					}
				})
				setDemoLoadingMessage("Demo is unable to load. Please try again later...")
			})
	}, [])

	return (
		<div className="page demo-access-page">
			<Header
				title="Accessing Demo"
			/>
			<main className="main demo-access-container">
				<p>{demoLoadingMessage}</p>
			</main>
		</div>
	)
}
