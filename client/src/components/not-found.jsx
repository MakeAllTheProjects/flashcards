import React from 'react'

import navReducer from '../utils/nav-reducer'

import './not-found.scss'
import Header from './header'
import NavSlideOut from './nav-slide-out'
import OhNoIcon from '../assets/svg/002-human.svg'
import ExclaimIcon from '../assets/svg/130-mark-1.svg'

export default function NotFound () {
  const [navState, navDispatch] = React.useReducer(navReducer)

  React.useEffect(() => {
    navDispatch({ type: 'CLOSE' })
  }, [])

  return (
    <div className='not-found-page'>
      <NavSlideOut
        navState={navState}
        navDispatch={navDispatch}
      />
      <Header
        cornerIcon={OhNoIcon}
        navState={navState}
        navDispatch={navDispatch}
        title="Oh No!"
      />
      <main className='not-found-container'>
        <h2>404</h2>
        <div className='img-wrapper'>
          <img
            alt='exclaimation'
            className='exclaimation-icon'
            src={ExclaimIcon}
          />
          <img
            alt='exclaimation'
            className='exclaimation-icon'
            src={ExclaimIcon}
          />
        </div>
        <h3>Page Not Found</h3>
      </main>
    </div>
  )
}