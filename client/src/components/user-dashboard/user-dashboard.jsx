import React from 'react'
import { navigate } from '@reach/router'
import { useCookies } from 'react-cookie'

import navReducer from '../../utils/nav-reducer'

import './user-dashboard.scss'
import Header from '../header'
import MenuSlideOut from '../menu-slide-out'
import NavBar from '../nav-bar'

import BrainIcon from '../../assets/svg/sticker-style/045-brain-2.svg'

export default function UserDashboard () {
  const [cookies] = useCookies(['authToken'])
  const [navState, navDispatch] = React.useReducer(navReducer)
  const [isCookie, setIsCookie] = React.useState(false)

  React.useEffect(() => {
    navDispatch({ type: 'CLOSE' })
  }, [])

  React.useEffect(() => {
    setIsCookie(cookies.authToken ? true : false)
    if (!cookies.authToken) {
      navigate('/')
    }
  }, [cookies])

  if (isCookie) {  
    return (
      <div className='page user-dashboard-page'>
        <MenuSlideOut
          navState={navState}
          navDispatch={navDispatch}
        />
        <NavBar/>
        <Header
          cornerIcon={BrainIcon}
          navState={navState}
          navDispatch={navDispatch}
          title={""}
        />
        <main className='main user-dashboard-container'>

        </main>
      </div>
    )
  } else {
    return (
      < div className = 'page user-dashboard-page' >
        <h2>Loading, please wait...</h2>
      </div>
    )
  }
}