import React from 'react'

import './landing.page.scss'
import Header from '../header'
import AuthForm from './auth-form'

export default function Landing () {
	return (
		<>
			<Header title="Let's study some stuff..."/>
			<main className='landing-main'>
				<AuthForm/>
			</main>
		</>
	)
}