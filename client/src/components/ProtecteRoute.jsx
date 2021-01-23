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
				cookies.authToken && cookies.authToken.token || state && state.token ? (
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
