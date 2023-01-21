import React, { useState } from 'react'

import AuthForm from './AuthForm'
import Header from '../../header/Header'

import './Landing.scss'
import ForgottenPasswordForm from './ForgottenPasswordForm'

export default function Landing() {
	const [isForgotten, setIsForgotten] = useState(false)

	return (
		<div className="page landing-page">
			<Header
				title="Welcome to FlashCourse"
			/>
			<main className="main landing-container">
				{isForgotten
					? <ForgottenPasswordForm />
					: <AuthForm />
				}
				<button
					className="forgot"
					onClick={() => setIsForgotten(!isForgotten)}
				>
					{isForgotten ? "Back to login" : "Forgot your password?"}
				</button>
			</main>
		</div>
	)
}