import React from 'react'
import { navigate } from '@reach/router'
import { useCookies } from 'react-cookie'

import navReducer from '../../utils/nav-reducer'

import './user-dashboard.scss'
import Header from '../header'
import NavSlideOut from '../nav-slide-out'
import BrainIcon from '../../assets/svg/045-brain-2.svg'

export default function UserDashboard () {
  const [cookies, setCookie] = useCookies(['authToken'])
  const [navState, navDispatch] = React.useReducer(navReducer)

  React.useEffect(() => {
    navDispatch({ type: 'CLOSE' })
  }, [])

  React.useEffect(() => {
    if (!cookies.authToken) {
      navigate('/')
    }
  }, [cookies])
  
  return (
    <div className='user-dashboard-page'>
      <NavSlideOut
        navState={navState}
        navDispatch={navDispatch}
      />
      <Header
        cornerIcon={BrainIcon}
        navState={navState}
        navDispatch={navDispatch}
        title="Welcome!"
      />
      <main className='user-dashboard-container'>
        dashboard stuff goes here
      </main>
    </div>
  )
}