import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'

import { GlobalContext, baseURL } from '../App'
import './CardForm.scss'

export default function CardForm ({card, isEdit}) {
	const context = useContext(GlobalContext)
	const { state, dispatch } = context
	const [answer, setAnswer] = useState('')
	const [question, setQuestion] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if ( isEdit ) {
			setAnswer(card.answer)
			setQuestion(card.question)
		}
	}, [card])

	const axiosCards = axios.create({
		headers: {
			Authorization: `Bearer ${state.token}`
		}
	})

	const createCard = (e) => {
		e.preventDefault(e)

		axiosCards.post(`${baseURL}/api/cards/user/${state.user.id}`, {question: question, answer: answer})
			.then(res => {
				dispatch({
					type: 'FETCH_CARDS_SUCCESS',
					payload: {
						cards: res.data.cards
					}
				})
			})
			.then(() => {
				setAnswer('')
				setQuestion('')
				setIsLoading(false)
			})
			.catch(err => {
				console.error(err)
				dispatch({
					type: 'SET_MESSAGE',
					payload: {
						message: 'New card not created.'
					}
				})
				setIsLoading(false)
			})
	}

	return (
		<form
			className="card-form"
			onSubmit={e => createCard(e)}
		>
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