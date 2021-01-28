import React, { useContext, useEffect, useState } from 'react'

import { GlobalContext } from '../../../App'
import Card from './Card'
import Header from '../../header/Header'
import Loading from '../../Loading'
import './CardLibrary.scss'
import ViewCardsIcon from '../../../assets/svg/sketch-style/018-layers.svg'

export default function CardLibrary () {
	const context = useContext(GlobalContext)
	const { state, dispatch } = context
	const [ visibleCards, setVisibleCards ] = useState([])
	const [ isLoading, setIsLoading ] = useState(true)

	useEffect(() => {
		setVisibleCards(state.cards)
		setIsLoading(false)
	}, [state.cards])

	return (
		<div className="page card-library-page">
			<Header
				title="Card Library"
				cornerIcon={ViewCardsIcon}
			/>
			<main className="main card-library-container">
				{isLoading && (
					<>
						<p className="loading-library">Loading Card Library...</p>
						<Loading/>
					</>
				)}
				{!isLoading && visibleCards.length > 0 && visibleCards.map(card => (
					<Card
						key={card.id}
						card={card}
					/>
				))}
			</main>
		</div>
	)
}
