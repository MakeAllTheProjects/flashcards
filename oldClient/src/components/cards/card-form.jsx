import axios from 'axios'
import React from 'react'
import { useCookies } from 'react-cookie'

import './card-form.scss'

export default function CardForm ({ cards, cardsDispatch, canEdit, setCanEdit, cardId }) {
	const [cookies] = useCookies(['authToken'])
	const [answer, setAnswer] = React.useState('')
	const [question, setQuestion] = React.useState('')
	const [selectedTags, setSelectedTags] = React.useState('')
	const [errorMessage, setErrorMessage] = React.useState('')

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
				console.error(err)
			})
	}

	function handleEditCardSubmit (e) {
		e.preventDefault()

		if (cardId) {
			cardsAxios.put(`/api/cards/${cardId}`, {
				question: question,
				answer: answer
			})
				.then (response => {
					if (response.data.cards.length === cards.length) {
						cardsDispatch({
							type: 'FETCH_USER_CARDS',
							cards: [...response.data.cards]
						})
						setCanEdit(false)
					}
				})
				.catch(err => {
					console.error(err)
				})
		}
	}

	return (
		<form
			className='create-card-form'
			onSubmit={canEdit ? e => handleEditCardSubmit(e) : e => handleCreateCardSubmit(e)}
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
				value={`${canEdit ? 'Edit' : 'Create New'} Card`}
			/>
			{canEdit && (
				<button
					className='cancel-edit-button'
					onClick={e => setCanEdit(false)}
				>
					Cancel
				</button>
			)}
		</form>
	)
}