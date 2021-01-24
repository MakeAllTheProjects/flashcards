export const initialState = {
	user: {
		id: '',
		username: '',
		firstname: ''
	},
	cards: [],
	token: '',
	message: ''
}

export const UserReducer = (state, action) => {
	let newState = { ...state }

	switch (action.type) {
		case 'LOGIN_SUCCESS':
			newState.user = {
				id: action.payload.id,
				username: action.payload.username,
				firstname: action.payload.firstname
			}
			newState.token = action.payload.token
			newState.message = `Welcome, ${action.payload.firstname}!`
			return newState

		case 'LOGIN_FAIL':
			newState = { ...initialState }
			newState.message = action.payload.message
			return newState

		case 'LOGOUT':
			newState = { ...initialState }
			return newState

		case 'FETCH_CARDS_SUCCESS':
			newState.cards = [...action.payload.cards]
			newState.message = `You have ${action.payload.cards.length} card${action.payload.cards.length > 1 ? 's' : ''}`
			return newState

		case 'FETCH_CARDS_FAIL':
			newState.cards = []
			newState.message = 'No cards found.'
			return newState

		default:
			return state
	}
}