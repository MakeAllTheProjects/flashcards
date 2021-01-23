import React from 'react'

import './Card.scss'

export default function Card ({id, question, answer}) {
	return (
		<article className="card">
			{question}
		</article>
	)
}