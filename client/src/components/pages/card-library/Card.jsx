import axios from 'axios'
import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { GlobalContext, baseURL } from '../../../App'
import DialogBox from '../../DialogBox'
import Modal from '../../Modal'
import './Card.scss'
import AlertIcon from '../../../assets/svg/sketch-style/problem.svg'
import DeleteIcon from '../../../assets/svg/sketch-style/delete.svg'
import EditIcon from '../../../assets/svg/sketch-style/pencil.svg'
import FailureIcon from '../../../assets/svg/sticker-style/038-delete.svg'
import SuccessIcon from '../../../assets/svg/sticker-style/039-interface-6.svg'
import ViewIcon from '../../../assets/svg/sketch-style/show.svg'

export default function Card ({card}) {
	const context = useContext(GlobalContext)
	const { state, dispatch } = context
	const [isFlipped, setIsFlipped] = useState(false)
	const [viewCardDetails, setViewCardDetails] = useState(false)
	const [isModalDisplayed, setIsModalDisplayed] = useState(false)
	let history = useHistory()


	const handleEditCard = async (id) => {
		await dispatch({
			type: 'SET_SELECTED_CARD',
			payload: {
				selectedCardId: id
			}
		})

		await history.push('/user/cards/edit')
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

	return (
		<>
			<div
				className={isFlipped ? "card flipped" : "card"}
			>
				<div className="card-control-panel">
					{!card.answer || card.answer === "" && (
						<img
							alt="issue with card"
							className="card-alert-icon"
							src={AlertIcon}
							title="issue with card"
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
					<div className="card-front">
						<p>{card.question}</p>
						{/* {viewCardDetailsPanel} */}
					</div>
					<div className="card-back">
						<p>{card.answer}</p>
						<img
							alt="failed attempt"
							className="attempt-icon failure"
							// onClick={() => logAttempt(false)}
							src={FailureIcon}
							title="Got the answer wrong!"
						/>
						{/* {viewCardDetailsPanel} */}
						<img
							alt="success attempt"
							className="attempt-icon success"
							// onClick={() => logAttempt(true)}
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
		</>
	)
}