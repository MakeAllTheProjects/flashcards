import React from 'react'
import { useCookies } from 'react-cookie'

import navReducer from '../utils/nav-reducer'

import './not-found.scss'
import Header from './header'
import NavSlideOut from './menu-slide-out'
import OhNoIcon from '../assets/svg/sticker-style/002-human.svg'
import ExclaimIcon from '../assets/svg/sticker-style/130-mark-1.svg'
import NavBar from './nav-bar'

export default function NotFound () {
  const [cookies] = useCookies(['authToken'])
  const [navState, navDispatch] = React.useReducer(navReducer)
  const [isCookie, setIsCookie] = React.useState(false)

  React.useEffect(() => {
    navDispatch({ type: 'CLOSE' })
  }, [])

  React.useEffect(() => {
    setIsCookie(cookies.authToken ? true : false)
  }, [cookies])

  return (
    <div className='page not-found-page'>
      {isCookie && <NavBar />}
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
      <main className='main not-found-container'>
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