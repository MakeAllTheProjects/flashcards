import React from 'react'
import { navigate } from '@reach/router'
import { useCookies } from 'react-cookie'

import navReducer from '../../utils/nav-reducer'

import './view-cards.scss'
import Card from './card'
import Header from '../header'
import NavSlideOut from '../nav-slide-out'

import ViewCardsIcon from '../../assets/svg/sketch-style/018-layers.svg'

export default function ViewCards () {
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
    <div className='page view-cards-page'>
      <NavSlideOut
        navState={navState}
        navDispatch={navDispatch}
      />
      <Header
        cornerIcon={ViewCardsIcon}
        navState={navState}
        navDispatch={navDispatch}
        title={"You have x cards"}
      />
      <main className='main view-cards-container'>
        <Card/>
      </main>
    </div>
  )
}