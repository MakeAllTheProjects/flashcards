import axios from 'axios'
import React from 'react'
import { useCookies } from 'react-cookie'

import './create-card.scss'

export default function CreateCard({ cards, cardsDispatch }) {
	const [cookies] = useCookies(['authToken'])
	const [answer, setAnswer] = React.useState('')
	const [question, setQuestion] = React.useState('')

	axios.defaults.timeout = 3000

	const cardsAxios = axios.create({
		headers: {
			Authorization: `Bearer ${cookies.authToken.token}`
		}
	})

	function handleCreateCardSubmit (e) {
		e.preventDefault()

		cardsAxios.post('/api/cards/create-card', {
			question: question,
			answer: answer
		})
			.then (response => {
				if (response.data.cards.length > cards.length) {
					cardsDispatch({
						type: 'FETCH_USER_CARDS',
						cards: [...response.data.cards]
					})
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	return (
		<form
			className='create-card-form'
			onSubmit={e => handleCreateCardSubmit(e)}
		>
			<input
				name='question'
				type='text'
				value={question}
				placeholder='Question'
				onChange={e => setQuestion(e.target.value)}
			/>
			<input
				name='answer'
				type='text'
				value={answer}
				placeholder='Answer'
				onChange={e => setAnswer(e.target.value)}
			/>
			<input
				className='submit-button'
				type='submit'
				value='Create New Card'
			/>
		</form>
	)
}