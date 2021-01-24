import React, { useContext } from 'react'

import { GlobalContext } from '../../../App'
import './CardLibrary.scss'
import Card from './Card'
import Header from '../../header/Header'

export default function CardLibrary () {
	const context = useContext(GlobalContext)
	const { state, dispatch } = context

	return (
		<div className="page card-library-page">
			<Header
				title="Card Library"
			/>
			<main className="main card-library-container">
				{state.cards.length > 0 && state.cards.map(card => (
					<Card
						key={card.id}
						card={card}
					/>
				))}
			</main>
		</div>
	)
}
