import React from 'react'

import './NotAvailable.scss'

import Header from '../../header/Header'
import comingSoonIcon from '../../../assets/svg/sticker-style/043-idea.svg'

export default function NotAvailable () {
	return (
		<div className="page not-available-page">
			<Header
				cornerIcon={comingSoonIcon}
				title={"Wait for it..."}
			/>
			<main className="main not-available-container">
				<p>This feature is not available yet.</p> 
				<p>Please check back later.</p>
			</main>
		</div>
	)
}
