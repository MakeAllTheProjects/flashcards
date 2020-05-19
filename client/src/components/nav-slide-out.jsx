import React from 'react'
import './nav-slide-out.scss'
import navReducer from '../utils/nav-reducer'

export default function NavSlideOut () {
  const [ navState, navDispatch ] = React.useReducer(navReducer)

  return (
    <div className={navState && navState.navOpen ? 'nav-slide-out-container open' : 'nav-slide-out-container'} onClick={() => navDispatch({type: 'CLOSE'})}>
      <nav className={navState && navState.navOpen ? 'nav-slide-out open' : 'nav-slide-out'}>
        <p>LOGOUT</p>
      </nav>
    </div>
  )
}