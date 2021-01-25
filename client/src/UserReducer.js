export const initialState = {
	user: {
		id: '',
		username: '',
		firstname: ''
	},
	cards: [],
	token: '',
	message: '',
	selectedCard: 0
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
			newState.message = "Card library loaded."
			return newState

		case 'FETCH_CARDS_FAIL':
			newState.cards = []
			newState.message = 'No cards found.'
			return newState

		case 'SET_MESSAGE':
			newState.message = action.payload.message
			return newState

		case 'SET_SELECTED_CARD':
			newState.selectedCard = action.payload.selectedCardId
			return newState

		default:
			return state
	}
}