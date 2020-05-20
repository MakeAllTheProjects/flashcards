import React from 'react'
import { useCookies } from 'react-cookie'

import userReducer from '../utils/user-reducer'

import './nav-slide-out.scss'

export default function NavSlideOut ({navState, navDispatch}) {
  const [cookies, setCookie, removeCookie] = useCookies(['authToken'])
  const [userState, userDispatch] = React.useReducer(userReducer)

  const handleLogout = () => {
    const expiredDate = new Date()
    expiredDate.setDate(expiredDate.getDate() - 1)
    userDispatch({ type: 'LOGOUT' })
    removeCookie('authToken', { expires: expiredDate})
  }

  return (
    <div
      className='nav-slide-out-container'
      style={{right: navState && navState.navOpen ? '0' : '-100%'}}
    >
      <nav
        className='nav-slide-out'
        style={{ transform: navState && navState.navOpen ? 'rotate(-17.5deg) skew(0)' : 'rotate(0) skew(25deg, -25deg)'}}
      >
        <p onClick={() => handleLogout()}>LOGOUT</p>
      </nav>
    </div>
  )
}