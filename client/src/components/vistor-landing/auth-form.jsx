import React, {
	useState,
	useEffect,
	useReducer
} from 'react'

import './auth-form.scss'

export default function AuthForm () {
	const [isNewUser, setIsNewUser] = useState(false)
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [email, setEmail] = useState("")
	const [firstname, setFirstname] = useState("")
	const [lastname, setLastname] = useState("")
	const [errMessage, setErrorMessage] = useState("")
	// const [cookies, setCookie] = useCookies(['authToken'])
	// const [state, dispatch] = useReducer(userReducer)

	async function handleAuth(e) {
		e.preventDefault()
	}

	return (
		<form
			className='auth-form'
		>
			<input
				autoComplete="no password"
				name="username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Username"
				type="text"
				required
			/>

			{isNewUser && (
				<>
					<input
						autoComplete="no password"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						type="email"
						required
						style={{background: 'none !important'}}
					/>

					<input
						autoComplete="no password"
						name="firstname"
						value={firstname}
						onChange={(e) => setFirstname(e.target.value)}
						placeholder="firstname"
						type="text"
						required
					/>

					<input
						autoComplete="no password"
						name="lastname"
						value={lastname}
						onChange={(e) => setLastname(e.target.value)}
						placeholder="Lastname"
						type="text"
					/>
				</>
			)}

			<input
				autoComplete="no password"
				name="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
				type="password"
				required
			/>

			{isNewUser && (
				<>
					<input
						name="confirmPassword"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder="Confirm Password"
						type="password"
						required
					/>

					{password !== confirmPassword && (
						<p className="password-confirm-error">Password must match confirmation</p>
					)}
				</>
			)}

			<button
				className="auth-button"
				onClick={(e) => handleAuth(e)}
			>
				{
					isNewUser
						? "Sign Up"
						: "Login"
				}
			</button>

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