import React from 'react'

import './Loading.scss'

export default function Loading () {
	return (
		<div className="loading">
			<div className="loading-card pink" />
			<div className="loading-card blue" />
			<div className="loading-card green" />
			<div className="loading-card yellow" />
		</div>
	)
}