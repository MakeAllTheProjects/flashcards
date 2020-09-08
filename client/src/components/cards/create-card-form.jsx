import axios from 'axios'
import React from 'react'

import './create-card-form.scss'

import CancelIcon from '../../assets/svg/sketch-style/063-cross.svg'
import CreateIcon from '../../assets/svg/sketch-style/059-checkmark.svg'

export default function CreateCardForm (props) {
	const [question, setQuestion] = React.useState("")
	const [answer, setAnswer] = React.useState("")
	const [errorMessage, setErrorMessage] = React.useState("")

	const handleSubmit = () => {
		props.cardsAxios.post(`/api/cards/create`, {question, answer})
			.then(response => {
				props.setCards(response.data.cards)
			}).catch(err => {
				console.error(err)
				setErrorMessage('Server error. Please try again later.')
			})
	}

	const handleCancel = () => {
		setQuestion("")
		setAnswer("")
		props.setCreateCard(false)
	}

	return (
		<form className="create-card-form">
			<div className="question">
				<h3>Question</h3>
				<div className="question-card">
					<textarea
						placeholder="Question goes here"
						value={question}
						onChange={e => setQuestion(e.target.value)}
					/>
				</div>
			</div>
			<div className="answer">
				<h3>Answer</h3>
				<div className="answer-card">
					<textarea
						placeholder="Answer goes here"
						value={answer}
						onChange={e => setAnswer(e.target.value)}
					/>
				</div>
			</div>

			<div className="form-buttons-container">
				<img
					alt="cancel"
					className="form-icon cancel"
					title="cancel card"
					src={CancelIcon}
					onClick={() => handleCancel()}
				/>
				<img
					alt="create"
					className="form-icon create"
					title="create card"
					src={CreateIcon}
					onClick={() => handleSubmit()}
				/>
			</div>
		</form>
	)
}