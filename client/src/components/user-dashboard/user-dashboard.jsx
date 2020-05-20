import React from 'react'
import { navigate, Link } from '@reach/router'
import { useCookies } from 'react-cookie'

import navReducer from '../../utils/nav-reducer'

import './user-dashboard.scss'
import Header from '../header'
import NavSlideOut from '../nav-slide-out'

import BrainIcon from '../../assets/svg/sticker-style/045-brain-2.svg'
import ViewCardsIcon from '../../assets/svg/sketch-style/018-layers.svg'


export default function UserDashboard () {
  const [cookies, setCookie] = useCookies(['authToken'])
  const [navState, navDispatch] = React.useReducer(navReducer)

  const navIcons = [
    {
      iconPath: ViewCardsIcon,
      name: 'View Cards',
      pathName: 'view-cards'
    }
  ]

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
        <div className='nav-icons-container'>
          {navIcons.length > 0 && navIcons.map(navIcon => (
            <Link
              key={navIcon.pathName}
              to={`/${navIcon.pathName}`}
              className='user-dashboard-nav-icon'
              style={{backgroundImage: `url(${navIcon.iconPath})`}}
            >
              <img
                className='icon-image'
                title={navIcon.name}
                src={ViewCardsIcon}
              />
              <p className='icon-text'>{navIcon.name}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}