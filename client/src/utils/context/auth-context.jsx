import axios from 'axios'
import React from 'react'

export const authContext = React.createContext({
	user: {
		id: null,
		username: null,
		firstname: null
	}
})

export const { Provider, Consumer } = authContext
