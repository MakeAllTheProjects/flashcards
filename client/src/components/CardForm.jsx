import React, { useEffect, useState } from 'react'

import './CardForm.scss'

export default function CardForm ({card, isEdit}) {
	const [answer, setAnswer] = useState('')
	const [question, setQuestion] = useState('')

	useEffect(() => {
		if ( isEdit ) {
			setAnswer(card.answer)
			setQuestion(card.question)
		}
	}, [card])

	return (
		<form className="card-form">
			<textarea
				placeholder="Question..."
				value={question}
				onChange={e => setQuestion(e.target.value)}
			/>
			<textarea
				placeholder="Answer..."
				value={answer}
				onChange={e => setAnswer(e.target.value)}
			/>
			<input
				className="submit-button"
				type="submit"
				value={isEdit ? "Edit Card" : "Create Card"}
			/>
		</form>
	)
}