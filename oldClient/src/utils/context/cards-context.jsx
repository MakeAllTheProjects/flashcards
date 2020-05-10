import axios from 'axios'
import React from 'react'

import cardsReducer from '../reducers/cards-reducer'

export const CardsContext = React.createContext({
	cards: []
})


