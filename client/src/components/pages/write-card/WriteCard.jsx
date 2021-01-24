import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useCookies } from 'react-cookie'

import { GlobalContext, baseURL } from '../../../App'
import './WriteCard.scss'
import Header from '../../header/Header'

export default function WriteCard ({isEdit}) {
	const context = useContext(GlobalContext)
	const { state, dispatch } = context
	const [answer, setAnswer] = useState('')
	const [question, setQuestion] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [cookies] = useCookies(['authToken'])

	useEffect(() => {
		if (isEdit) {
			if (window.location.pathname === '/user/cards/edit' && state.selectedCard > 0) {
				const cardToEdit = state.cards.find(card => card.id === state.selectedCard)
				cardToEdit.answer && setAnswer(cardToEdit.answer)
				cardToEdit.question && setQuestion(cardToEdit.question)
			}
		}
	}, [isEdit, state.selectedCard, state.cards])

	const axiosCards = axios.create({
		headers: {
			Authorization: `Bearer ${state.token}`
		}
	})

	const createCard = async (e) => {
		e.preventDefault(e)

		await setIsLoading(true)

		await axiosCards.post(`${baseURL}/api/cards/user/${state.user.id}`, { question: question, answer: answer })
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

	const editCard = async (e) => {
		e.preventDefault()

		console.log("editting")

		axiosCards.put(`${baseURL}/api/cards/${state.selectedCard}/user/${state.user.id}`, { question: question, answer: answer })
			.then(res => {
				dispatch({
					type: 'FETCH_CARDS_SUCCESS',
					payload: {
						cards: res.data.cards
					}
				})
			})
			.then(() => {
				setIsLoading(false)
			})
			.catch(err => {
				console.error(err)
				dispatch({
					type: 'SET_MESSAGE',
					payload: {
						message: 'Card not editted created.'
					}
				})
				setIsLoading(false)
			}
		)
	}

	return (
		<div className="page write-card-page">
			<Header
				title={isEdit ? "Edit Card" : "Write a Card"}
			/>
			<main className="main write-card-container">
				<form
					className="card-form"
					onSubmit={isEdit ? e => editCard(e) : e => createCard(e)}
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
			</main>
		</div>
	)
}
