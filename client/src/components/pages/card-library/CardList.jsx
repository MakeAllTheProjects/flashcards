import React from 'react'

import { GlobalContext } from '../../../App'

import './CardList.scss'
import Card from './Card'

export default function CardList () {
	const context = useContext(GlobalContext)
	const { state, dispatch } = context
	const { cards } = state

	return (
		<section className="card-list">
		
		</section>
	)
}