import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useCookies } from 'react-cookie'
import CreatableSelect from 'react-select/creatable'

import { GlobalContext, baseURL } from '../../../App'
import Header from '../../header/Header'
import './WriteCard.scss'
import EditCardIcon from '../../../assets/svg/sketch-style/005-draw.svg'

export default function WriteCard ({isEdit}) {
	const context = useContext(GlobalContext)
	const { state, dispatch } = context
	const [answer, setAnswer] = useState('')
	const [question, setQuestion] = useState('')
	const [tags, setTags] = useState([])
	const [selectedTag, setSelectedTag] = useState({})
	const [isNewTag, setIsNewTag] = useState(false)
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

	useEffect(() => {
		const axiosUser = axios.create({
			headers: {
				Authorization: `Bearer ${state.token}`
			}
		})

		axiosUser.get(`${baseURL}/api/tags/user/${state.user.id}`)
			.then(res => {
				setTags(res.data.tags)
			})
			.catch(err => {
				console.error(err)
			})
	}, [])

	const createCard = async (e) => {
		e.preventDefault(e)

		await setIsLoading(true)

		await axiosCards.post(
			`${baseURL}/api/cards/user/${state.user.id}`, 
			{ 
				question: question,
				answer: answer,
				tag: selectedTag
			}
		)
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
	
	const selectStyle = {
		option: (provided, styleState) => ({
			...provided,
			padding: '0.5rem 1.5rem',
			fontSize: '1.75rem',
			fontFamily: 'Quicksand',
			background: styleState.isFocused | styleState.isSelected
										? 'rgba(50, 250, 0, 0.3)' 
										: 'rgba(0, 0, 0, 0)'
		}),
		input: () => ({
			fontSize: '1.75rem',
			fontFamily: 'Quicksand'
		}),
		placeholder: () => ({
			fontSize: '1.75rem',
			fontFamily: 'Quicksand'
		}),
		control: () => ({
			width: '27.5rem',
			margin: '1.5rem',
			background: 'rgba(250, 250, 0, 0.3)',
			border: '0.2rem solid rgba(50, 50, 50, 0.65)',
			borderRadius: '0.5rem',
			boxShadow: 'rgba(250, 250, 0, 0.3) 0.3rem 0.5rem 0.3rem, rgba(250, 250, 0, 0.3) -0.3rem -0.3rem 0.3rem',
			fontSize: '1.75rem',
			fontFamily: 'Quicksand',
			display: 'flex',
			alignItems: 'center',
			justifyContents: 'center'
		}),
		menu: () => ({
			background: 'rgba(250, 250, 0, 0.3)',
			margin: '-1.7rem auto 0 auto',
			width: '27.5rem',
			borderRight: '0.2rem solid rgba(50, 50, 50, 0.65)',
			borderLeft: '0.2rem solid rgba(50, 50, 50, 0.65)',
			borderBottom: '0.2rem solid rgba(50, 50, 50, 0.65)',
			borderRadius: '0 0 0.5rem 0.5rem',
			boxShadow: 'rgba(250, 250, 0, 0.3) 0.3rem 0.5rem 0.3rem, rgba(250, 250, 0, 0.3) -0.3rem -0.3rem 0.3rem'
		}),
		singleValue: (provided, styleState) => {
			const opacity = styleState.isDisabled ? 0.5 : 1
			const transition = 'opacity 300ms'
			return { 
				...provided, 
				opacity, 
				transition,
				fontSize: '1.75rem',
				fontFamily: 'Quicksand'
			}
		}
	}

	const handleTagChange = (newValue, actionMeta) => {
		switch(actionMeta.action) {
			case 'clear':
				setSelectedTag({})
				break
			case 'select-option':
				setSelectedTag({
					tagId: newValue.value.tagId,
					tagLabel: newValue.label
				})
				break
			case 'create-option':
				setSelectedTag({
					tagId: 'new',
					tagLabel: newValue.label
				})
				break
			default: 
				break
		}
  }

	return (
		<div className="page write-card-page">
			<Header
				title={isEdit ? "Edit Card" : "Write a Card"}
				cornerIcon={EditCardIcon}
			/>
			<main className="main write-card-container">
				<form
					className="card-form"
					onSubmit={isEdit ? e => editCard(e) : e => createCard(e)}
				>
					<CreatableSelect
						isClearable
						captureMenuScroll
						closeMenuOnSelect
						allowCreateWhileLoading={false}
						styles={selectStyle}
						options={tags.map(tag => ({ value: tag, label: tag.tagLabel }))}
						onChange={handleTagChange}
						onInputChange={handleTagChange}
						placeholder="(Optional) Select a tag..."
					/>
					<textarea
						placeholder="Question..."
						value={question}
						onChange={e => setQuestion(e.target.value)}
						required
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
