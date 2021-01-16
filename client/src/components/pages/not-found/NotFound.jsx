import React from 'react'

import './NotFound.scss'
import ohNoIcon from '../../../assets/svg/sticker-style/002-human.svg'

import Header from '../../header/Header'

export default function NotFound () {
	return (
		<div className="page not-found">
			<Header
				cornerIcon={ohNoIcon}
				title="Oh No!"
			/>
			<main className="main">
				NOT FOUND
			</main>
		</div>
	)
}