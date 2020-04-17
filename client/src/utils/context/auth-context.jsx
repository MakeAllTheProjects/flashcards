import React from 'react'

const initialAuthState = {
	user: {
		id: null,
		username: null,
		firstname: null
	},
	token: null
}

const storeAuth = React.createContext(initialAuthState)

const { Provider } = storeAuth

const AuthProvider = ({ children }) => {
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
			default: 
				throw new Error()
		}
	}, initialAuthState)

	return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { storeAuth, AuthProvider }
