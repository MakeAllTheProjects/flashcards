import axios from 'axios'
import React from 'react'
import { useCookies } from 'react-cookie'

import navReducer from '../../utils/nav-reducer'

import './create-card.scss'

import CardForm from './card-form'
import Header from '../header'
import MenuSlideOut from '../menu-slide-out'
import NavBar from '../nav-bar'

import CreateCardIcon from '../../assets/svg/sketch-style/005-draw.svg'

export default function CreateCard (props) {
	const [cookies] = useCookies(['authToken'])
	const [navState, navDispatch] = React.useReducer(navReducer)
	const [errorMessage, setErrorMessage] = React.useState("")
	const [question, setQuestion] = React.useState("")
	const [answer, setAnswer] = React.useState("")

	const cardsAxios = axios.create({
		headers: {
			Authorization: `Bearer ${cookies.authToken.token}`
		}
	})

	const createCard = () => {
		cardsAxios.post(`/api/cards/create`, { question, answer })
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
			<CardForm
				setErrorMessage={setErrorMessage}
				formAction={createCard}
				answer={answer}
				setAnswer={setAnswer}
				question={question}
				setQuestion={setQuestion}
				handleCancel={handleCancel}
			/>
		</div>
	)
}