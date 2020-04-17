import React from 'react'
import { 
  Redirect, 
  Router, 
  navigate
} from '@reach/router'

import './App.scss'
import { useCookies } from 'react-cookie'

import { storeAuth } from './utils/context/auth-context'

import Landing from './components/visitor-landing/landing'
import UserDashboard from './components/user-dashboard/user-dashboard'

export default function App() {
  const [ cookies, setCookies ] = useCookies(['authToken'])
  const authContext = React.useContext(storeAuth)
  const { state, dispatch } = authContext

  React.useEffect(() => {
		if (cookies.authToken) {
      console.log(cookies.authToken)
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
  
  console.log(state)
  console.log(cookies.authToken)

  return (
    <div className="App">
      <Router>
        {state.token
          ? <UserDashboard path='/'/>
          : <Landing path='/'/>
        }
      </Router>
    </div>
  )
}
