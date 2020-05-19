import React from 'react'
import './header.scss'
import DefaultLogo from '../assets/logo.png'
import navReducer from '../utils/nav-reducer'

export default function Header ({title, cornerIcon}) {
  const [ isMenuOpen, setIsMenuOpen ] = React.useState(false)
  const [ navState, navDispatch ] = React.useReducer(navReducer)

  console.log(navState) //undefined?
  
  return (
    <header className='app-header'>
      <div className='icon-container'>
        <img src={cornerIcon ? cornerIcon : DefaultLogo} className='header-logo' alt=''/>
      </div>
      <div className='header-main'>
        <h1 className='header-title'>{title}</h1>
        <div
          className={isMenuOpen ? 'menu-button-container open' : 'menu-button-container'}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={isMenuOpen ? 'menu-bar open' :'menu-bar'}/>
          <div className={isMenuOpen ? 'menu-bar open' : 'menu-bar'} />
          <div className={isMenuOpen ? 'menu-bar open' : 'menu-bar'} />
        </div>
      </div>
    </header>
  )
}