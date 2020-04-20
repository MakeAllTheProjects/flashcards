import React from 'react'
import { 
  Redirect, 
  Router, 
  navigate
} from '@reach/router'
import { useCookies } from 'react-cookie'

import './App.scss'

import { storeUser } from './utils/context/user-context'

import Landing from './components/visitor-landing/landing'
import NotFound from './components/not-found/not-found'
import UserDashboard from './components/user-dashboard/user-dashboard'

export default function App() {
  const [ cookies, setCookies ] = useCookies(['authToken'])
  const authContext = React.useContext(storeUser)
  const { state, dispatch } = authContext

  React.useEffect(() => {
		if (cookies.authToken) {
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
    }
  }, [])

  return (
    <div className="App">
      <Router>
        <NotFound default/>
        {state.token === null ? (
          <>
            <Landing path='/'/>
          </>
        ) : (
          <>
            <UserDashboard path='/'/>
          </>
        )}
      </Router>
    </div>
  )
}
