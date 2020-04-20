import axios from 'axios'
import React from 'react'

axios.defaults.timeout = 30000

const initialAuthState = {
	user: {
		id: null,
		username: null,
		firstname: null
	},
	cards: [],
	token: null,
	userAxios: async () => {
		await axios.create({
			Authorization: 'Bearer ' + this.token
		})
	},
	errorMessage: ''
}

const storeUser = React.createContext(initialAuthState)

const { Provider } = storeUser

const UserProvider = ({ children }) => {
	const [state, dispatch] = React.useReducer((state, action) => {
		switch(action.type) {
			case 'authorized user':
				return {
					...state,
					user: {
						id: action.payload.user.id,
						username: action.payload.user.username,
						firstname: action.payload.user.firstname
					},
					token: action.payload.token
				}
			case 'logout user':
				return {
					...state,
					user: {
						id: null,
						username: null,
						firstname: null
					},
					token: null
				}
			case `fetch all users' cards`:
				state.userAxios('/api/cards')
					.then(response => {
						console.log(response.data.cards)
						return {
							...state,
							cards: [...response.data.cards]
						}
					})
					.catch(err => {
						console.log(err)
						return {
							...state,
							errorMessage: err
						}
					})
			default: 
				throw new Error()
		}
	}, initialAuthState)

	return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { storeUser, UserProvider }
