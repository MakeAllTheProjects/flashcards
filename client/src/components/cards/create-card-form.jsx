import axios from 'axios'
import React from 'react'
import { useCookies } from 'react-cookie'

import navReducer from '../../utils/nav-reducer'

import './create-card-form.scss'

import Header from '../header'
import MenuSlideOut from '../menu-slide-out'
import NavBar from '../nav-bar'

import CancelIcon from '../../assets/svg/sketch-style/063-cross.svg'
import CreateIcon from '../../assets/svg/sketch-style/059-checkmark.svg'
import CreateCardIcon from '../../assets/svg/sketch-style/005-draw.svg'

export default function CreateCardForm (props) {
	const [cookies] = useCookies(['authToken'])
	const [navState, navDispatch] = React.useReducer(navReducer)
	const [question, setQuestion] = React.useState("")
	const [answer, setAnswer] = React.useState("")
	const [errorMessage, setErrorMessage] = React.useState("")

	const cardsAxios = axios.create({
		headers: {
			Authorization: `Bearer ${cookies.authToken.token}`
		}
	})

	const handleSubmit = () => {
		cardsAxios.post(`/api/cards/create`, {question, answer})
			.then(response => {
				setErrorMessage("Card created! Make another?")
				setQuestion("")
				setAnswer("")
			}).catch(err => {
				console.error(err)
				setErrorMessage('Server error. Please try again later.')
			})
	}

	const handleCancel = () => {
		setQuestion("")
		setAnswer("")
		setErrorMessage("")
	}

	return (
		<div className="page create-card">
			<MenuSlideOut
				navState={navState}
				navDispatch={navDispatch}
			/>
			<NavBar />
			<Header
				cornerIcon={CreateCardIcon}
				navState={navState}
				navDispatch={navDispatch}
				title={"Create a Card"}
			/>

			<main className="main create-card-container">
				{errorMessage && <p className="error-message">{errorMessage}</p>}
				<form className="create-card-form">
					<div className="question">
						<div className="question-card">
							<textarea
								placeholder="Question goes here"
								value={question}
								onChange={e => setQuestion(e.target.value)}
							/>
						</div>
					</div>
					<div className="answer">
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
			</main>
		</div>
	)
}