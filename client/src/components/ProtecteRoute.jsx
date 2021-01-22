import React, { useContext} from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { GlobalContext } from '../App'

export default function ProtectedRoute ({children, ...rest}) {
	const [cookies, setCookie] = useCookies(['authToken'])
	const context = useContext(GlobalContext)
	const { state } = context

	return (
		<Route
			{...rest}
			render={({ location }) =>
				state.token && state.user.username || cookies.authToken.token && cookies.authToken.user.username ? (
					children
				) : (
						<Redirect
							to={{
								pathname: "/",
								state: { from: location }
							}}
						/>
					)
			}
		/>
	)
}
