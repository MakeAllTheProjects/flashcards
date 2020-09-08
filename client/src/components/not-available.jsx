import React from 'react'
import { navigate } from '@reach/router'
import { useCookies } from 'react-cookie'

import navReducer from '../utils/nav-reducer'

import './not-available.scss'
import Header from '../components/header'
import MenuSlideOut from '../components/menu-slide-out'
import NavBar from '../components/nav-bar'
import ComingSoonIcon from '../assets/svg/sticker-style/043-idea.svg'

export default function NotAvailable () {
  const [ cookies ] = useCookies( [ 'authToken' ] )
  const [navState, navDispatch ] = React.useReducer( navReducer )
  const [isCookie, setIsCookie] = React.useState(false)

  React.useEffect(() => {
    navDispatch({ type: 'CLOSE' })
  }, [])

  React.useEffect(() => {
    setIsCookie(cookies.authToken ? true : false)
    if ( !cookies.authToken ) {
      navigate('/')
    }
  }, [cookies])

  return (
    <div className='page not-available-page'>
      <MenuSlideOut
        navState={navState}
        navDispatch={navDispatch}
      />
      {isCookie && <NavBar/>}
      <Header
        cornerIcon={ComingSoonIcon}
        navState={navState}
        navDispatch={navDispatch}
        title={"Wait for it..."}
      />
      <main className='main not-available-container'>
        This feature is not available yet. Please check back at a later date.
      </main>
    </div>
  )
}