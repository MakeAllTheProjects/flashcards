import React from 'react'

const initialAuthState = {
	user: {
		id: null,
		username: null,
		firstname: null
	},
	token: null,
	cards: []
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
					token: null,
					cards: []
				}
			case 'store cards':
				return {
					...state,
					cards: [...action.payload.cards]
				}
			default: 
				throw new Error()
		}
	}, initialAuthState)

	return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { storeUser, UserProvider }
