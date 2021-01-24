import React from 'react'

import './WriteCard.scss'
import CardForm from '../../CardForm'
import Header from '../../header/Header'

export default function WriteCard () {
	return (
		<div className="page write-card-page">
			<Header
				title="Write a Card"
			/>
			<main className="main write-card-container">
				<CardForm/>
			</main>
		</div>
	)
}
