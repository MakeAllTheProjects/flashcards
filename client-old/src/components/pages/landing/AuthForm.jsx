import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import { GlobalContext } from '../../../App'
import { baseURL } from '../../../App'
import './AuthForm.scss'

export default function AuthForm () {
	const [cookies, setCookie] = useCookies(['authToken'])
	const context = useContext(GlobalContext)
	const { state, dispatch } = context
	const [isLoading, setIsLoading] = useState(false)
	const [isNewUser, setIsNewUser] = useState(false)
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [email, setEmail] = useState("")
	const [firstname, setFirstname] = useState("")
	const [lastname, setLastname] = useState("")
	const [errMessage, setErrorMessage] = useState("")
	let navigate = useNavigate()

	const handleAuth = (e) => {
		e.preventDefault()
		setIsLoading(true)
		axios.post(`${baseURL}/auth/${isNewUser ? 'signup' : 'login'}`, { 
			username: username,
			email: email,
			firstname: firstname,
			lastname: lastname,
			password: password
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
			}).then(data => {
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
			}).then(() => {
				navigate.push('/user')
			})
			.catch(err => {
				console.error(err)
				dispatch({ 
					type: 'LOGIN_FAIL', 
					payload: {
						message: 'Authorization failed.'
					}
				})
			})
	}

	return (
		<form className="auth-form" autoComplete='off' onSubmit={e => handleAuth(e)}>
			<h2>{isNewUser ? 'Sign up to start studying...' : 'Login and get back to studying...'}</h2>
			
			<input
				className="fake-input"
				name="username"
				type="text"
			/>
			<input
				type='password'
				className='fake-input' 
			/>

			<input
				autoComplete="no password"
				name="real-username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Username"
				type="text"
				required
			/>

			{isNewUser && (
				<>
					<input
						autoComplete="chrome-off"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						type="email"
						required
					/>

					<input
						autoComplete="chrome-off"
						name="firstname"
						value={firstname}
						onChange={(e) => setFirstname(e.target.value)}
						placeholder="firstname"
						type="text"
						required
					/>

					<input
						autoComplete="chrome-off"
						name="lastname"
						value={lastname}
						onChange={(e) => setLastname(e.target.value)}
						placeholder="Lastname"
						type="text"
					/>
				</>
			)}

			<input
				autoComplete="chrome-off"
				name="real-password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
				type="password"
				required
			/>

			{isNewUser && (
				<input
					name="confirmPassword"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					placeholder="Confirm Password"
					type="password"
					required
				/>
			)}

			<input
				className="auth-button"
				type="submit"
				value={isNewUser ? "Sign Up" : "Login"}
			/>

			{isNewUser && password !== confirmPassword && <p className="password-confirm-error">Password must match confirmation</p>}
			<p className="auth-error-message">
				{errMessage}
			</p>

			<p
				className="new-user-toggle"
				onClick={() => setIsNewUser(!isNewUser)}
			>
				{
					isNewUser
						? "Already have an account?"
						: "Don't have an account?"
				}
			</p>
		</form>
	)
}
