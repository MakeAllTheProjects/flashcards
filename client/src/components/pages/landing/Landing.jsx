import React from 'react'

import AuthForm from './AuthForm'
import Header from '../../header/Header'

import './Landing.scss'

export default function Landing () {
	return (
		<div className="page landing-page">
			<Header
				title="Welcome to FlashCourse"
			/>
			<main className="main landing-container">
				<AuthForm/>
			</main>
		</div>
	)
}