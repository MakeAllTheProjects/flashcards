import React from 'react'

import './NotFound.scss'
import ohNoIcon from '../../../assets/svg/sticker-style/002-human.svg'
import ExclaimIcon from '../../../assets/svg/sticker-style/130-mark-1.svg'

import Header from '../../header/Header'

export default function NotFound () {
	return (
		<div className="page not-found-page">
			<Header
				cornerIcon={ohNoIcon}
				title="Oh No!"
			/>
			<main className="main not-found-container">
				<h2>404</h2>
				<div className='img-wrapper'>
					<img
						alt='exclaimation'
						className='exclaimation-icon'
						src={ExclaimIcon}
					/>
					<img
						alt='exclaimation'
						className='exclaimation-icon'
						src={ExclaimIcon}
					/>
				</div>
				<h3>Page Not Found</h3>
			</main>
		</div>
	)
}