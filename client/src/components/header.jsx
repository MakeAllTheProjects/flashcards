import React from 'react'
import './header.scss'
import DefaultLogo from '../assets/logo.png'

export default function Header ({title, cornerIcon, navState, navDispatch}) {
  return (
    <header className='app-header'>
      <div className='icon-container'>
        <img src={cornerIcon ? cornerIcon : DefaultLogo} className='header-logo' alt=''/>
      </div>
      <div className='header-main'>
        <h1 className='header-title'>{title}</h1>
        {window.location.pathname !== '/' &&
          <div
            className={navState && navState.navOpen ? 'menu-button-container open' : 'menu-button-container'}
            onClick={() => navDispatch({type: 'TOGGLE', navOpen: !navState.navOpen})}
          >
            <div className={navState && navState.navOpen ? 'menu-bar open' :'menu-bar'}/>
            <div className={navState && navState.navOpen ? 'menu-bar open' : 'menu-bar'} />
            <div className={navState && navState.navOpen ? 'menu-bar open' : 'menu-bar'} />
          </div>
        }
      </div>
    </header>
  )
}