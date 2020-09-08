import React from 'react'
import { navigate } from '@reach/router'
import { useCookies } from 'react-cookie'

import navReducer from '../utils/nav-reducer'

import './not-available.scss'
import Header from '../components/header'
import NavSlideOut from '../components/menu-slide-out'
import ComingSoonIcon from '../assets/svg/sticker-style/043-idea.svg'

export default function NotAvailable () {
  const [ cookies ] = useCookies( [ 'authToken' ] )
  const  [navState, navDispatch ] = React.useReducer( navReducer )

  React.useEffect(() => {
    navDispatch({ type: 'CLOSE' })
  }, [])

  React.useEffect(() => {
    if ( !cookies.authToken ) {
      navigate('/')
    }
  }, [cookies])

  return (
    <div className='page not-available-page'>
      <NavSlideOut
        navState={navState}
        navDispatch={navDispatch}
      />
      <Header
        cornerIcon={ComingSoonIcon}
        navState={navState}
        navDispatch={navDispatch}
        title={"This feature isn't available yet..."}
      />
      <main className='main not-available-container'>
        Please check back at a later dated
      </main>
    </div>
  )
}