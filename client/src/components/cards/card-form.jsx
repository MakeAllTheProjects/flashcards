import axios from 'axios'
import React from 'react'

import './card-form.scss'

import CancelIcon from '../../assets/svg/sketch-style/063-cross.svg'
import CreateIcon from '../../assets/svg/sketch-style/059-checkmark.svg'

export default function CardForm (props) {
	const { 
		answer,
		setAnswer,
		setQuestion,
		question,
		errorMessage,
		setErrorMessage,
		formAction		
	} = props
	const [answerInputValue, setAnswerInputValue] = React.useState("")
	const [questionInputValue, setQuestionInputValue] = React.useState("")

	const handleSubmit = () => {
		formAction(question, answer)
	}

	return (
		<main className="main create-card-container">
			{errorMessage && <p className="error-message">{errorMessage}</p>}
			<form className="create-card-form">
				<div className="question">
					<div className="question-card">
						<textarea
							placeholder="Question goes here"
							value={question}
							onChange={e => setQuestion(e.target.value)}
							onFocus={e => e.target.select()}
						/>
					</div>
				</div>
				<div className="answer">
					<div className="answer-card">
						<textarea
							placeholder="Answer goes here"
							value={answer}
							onChange={e => setAnswer(e.target.value)}
							onFocus={e => e.target.select()}
						/>
					</div>
				</div>

				<div className="form-buttons-container">
					<img
						alt="cancel"
						className="form-icon cancel"
						title="cancel card"
						src={CancelIcon}
						onClick={() => props.handleCancel()}
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
		</main>
	)
}