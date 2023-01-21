import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { GlobalContext, baseURL } from '../../../App'
import AttemptDetails from './AttemptDetails'
import CardTags from './CardTags'
import DialogBox from '../../DialogBox'
import Modal from '../../Modal'
import './Card.scss'
import AlertIcon from '../../../assets/svg/sketch-style/problem.svg'
import DeleteIcon from '../../../assets/svg/sketch-style/delete.svg'
import EditIcon from '../../../assets/svg/sketch-style/pencil.svg'
import FailureIcon from '../../../assets/svg/sticker-style/038-delete.svg'
import SuccessIcon from '../../../assets/svg/sticker-style/039-interface-6.svg'
import ViewIcon from '../../../assets/svg/sketch-style/show.svg'

export default function Card({ card, cardColor }) {
	const context = useContext(GlobalContext)
	const { state, dispatch } = context
	const [isFlipped, setIsFlipped] = useState(false)
	const [viewCardDetails, setViewCardDetails] = useState(false)
	const [isModalDisplayed, setIsModalDisplayed] = useState(false)
	let navigate = useNavigate()

	const handleEditCard = async (id) => {
		await dispatch({
			type: 'SET_SELECTED_CARD',
			payload: {
				selectedCardId: id
			}
		})

		await navigate.push('/user/cards/edit')
	}

	const handleDeleteCardConfirmation = async (id) => {
		await dispatch({
			type: 'SET_SELECTED_CARD',
			payload: {
				selectedCardId: id
			}
		})
		setIsModalDisplayed(!isModalDisplayed)
	}

	const deleteCard = async () => {
		const axiosCards = axios.create({
			headers: {
				Authorization: `Bearer ${state.token}`
			}
		})

		await axiosCards.delete(`${baseURL}/api/cards/${state.selectedCard}/user/${state.user.id}`)
			.then(res => {
				dispatch({
					type: 'FETCH_CARDS_SUCCESS',
					payload: {
						cards: res.data.cards
					}
				})
			})
			.then(() => {
				setIsModalDisplayed(false)
			})
			.catch(err => {
				console.error(err)
				dispatch({
					type: 'SET_MESSAGE',
					payload: {
						message: 'New card not created.'
					}
				})
				setIsModalDisplayed(false)
			})
	}

	const cancelDeleteCard = async () => {
		await dispatch({
			type: 'SET_SELECTED_CARD',
			payload: {
				selectedCardId: 0
			}
		})
		setIsModalDisplayed(!isModalDisplayed)
	}

	const logAttempt = async (attempt) => {
		const axiosCards = axios.create({
			headers: {
				Authorization: `Bearer ${state.token}`
			}
		})

		await axiosCards.post(`${baseURL}/api/attempt/card/${card.id}/user/${state.user.id}`, { attempt })
			.then(res => {
				dispatch({
					type: 'LOG_ATTEMPT',
					payload: {
						cardId: card.id,
						attempts: res.data.attempts
					}
				})
			})
			.catch(err => {
				console.error(err)
				dispatch({
					type: 'SET_MESSAGE',
					payload: {
						message: "Answer not logged"
					}
				})
			})
	}

	return (
		<div className="card-container">
			{viewCardDetails && (
				<CardTags
					viewCardDetails={viewCardDetails}
					tags={card.tags}
				/>
			)}
			<div
				className={isFlipped ? "card flipped" : "card"}
			>
				<div className="card-control-panel">
					{card.answer === "" && (
						<img
							alt="question only"
							className="card-alert-icon"
							src={AlertIcon}
							title="question only"
						/>
					)}
					<img
						alt="view card details"
						className="card-control-icon view"
						onClick={() => setViewCardDetails(!viewCardDetails)}
						src={ViewIcon}
						title="view card details"
					/>
					<img
						alt="edit card"
						className="card-control-icon edit"
						onClick={() => handleEditCard(card.id)}
						src={EditIcon}
						title="edit card"
					/>
					<img
						alt="delete card"
						className="card-control-icon delete"
						onClick={() => handleDeleteCardConfirmation(card.id)}
						src={DeleteIcon}
						title="delete card"
					/>
				</div>

				<div
					className="card-content"
					onClick={() => setIsFlipped(!isFlipped)}
				>
					<div className="card-front" style={{ backgroundColor: cardColor }}>
						<p className="card-text">{card.question}</p>
						{viewCardDetails && (
							<AttemptDetails
								viewCardDetails={viewCardDetails}
								recentAttempts={card.attempts?.length > 10 ? card.attempts.slice(0, 10) : card.attempts}
							/>
						)}
					</div>
					<div className="card-back" style={{ backgroundColor: cardColor }}>
						<p className="card-text">{card.answer}</p>
						<img
							alt="failed attempt"
							className="attempt-icon failure"
							onClick={() => logAttempt(false)}
							src={FailureIcon}
							title="Got the answer wrong!"
						/>
						{viewCardDetails && (
							<AttemptDetails
								viewCardDetails={viewCardDetails}
								recentAttempts={card.attempts.length > 10 ? card.attempts.slice(0, 10) : card.attempts}
							/>
						)}
						<img
							alt="success attempt"
							className="attempt-icon success"
							onClick={() => logAttempt(true)}
							src={SuccessIcon}
							title="Got the answer right!"
						/>
					</div>
				</div>
			</div>
			<Modal
				display={isModalDisplayed}
				setDisplay={setIsModalDisplayed}
			>
				<DialogBox
					open={isModalDisplayed}
					message="Are you sure you want to delete this card?"
					cancelAction={cancelDeleteCard}
					cancelText="No"
					confirmAction={deleteCard}
					confirmText="Yes"
				/>
			</Modal>
		</div>
	)
}