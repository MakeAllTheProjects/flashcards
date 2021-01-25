import React, { useContext } from 'react'

import { GlobalContext } from '../../../App'
import Card from './Card'
import Header from '../../header/Header'
import './CardLibrary.scss'
import ViewCardsIcon from '../../../assets/svg/sketch-style/018-layers.svg'

export default function CardLibrary () {
	const context = useContext(GlobalContext)
	const { state, dispatch } = context

	return (
		<div className="page card-library-page">
			<Header
				title="Card Library"
				cornerIcon={ViewCardsIcon}
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
