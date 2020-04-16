import React from 'react'
import { useCookies } from 'react-cookie'

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
	const [cookies, setCookies] = useCookies(['authToken'])
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

	React.useEffect(() => {
		dispatch({
			type: 'authorized user', payload: {
				user: {
					id: cookies.authToken.user.id,
					username: cookies.authToken.user.username,
					firstname: cookies.authToken.user.firstname
				},
				token: cookies.authToken.token
			}
		})
	}, [])

	return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { storeAuth, AuthProvider }



