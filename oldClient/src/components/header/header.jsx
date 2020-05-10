import React from 'react'
import { useCookies } from 'react-cookie'
import { navigate } from '@reach/router'

import userReducer from '../../utils/reducers/user-reducer'
import cardsReducer from '../../utils/reducers/cards-reducer'

import './header.scss'

export default function Header (props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [ cookies, removeCookie ] = useCookies(['authToken'])
  const [ userState, userDispatch ] = React.useReducer(userReducer)
  const [ cardsState, cardsDispatch ] = React.useReducer(cardsReducer)

  function handleLogOut () {
    userDispatch({
      type: 'LOGOUT'
    })
    cardsDispatch({
      type: 'CLEAR_CARDS'
    })
    removeCookie('authToken')
    setTimeout(navigate('/'), 500)
  }

  return (
    <header className='app-header'>
      <div className='header-top-bar'>
        <div
          className={isMenuOpen ? 'menu-button-container open' : 'menu-button-container'}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={isMenuOpen ? 'menu-bar open' :'menu-bar'}/>
          <div className={isMenuOpen ? 'menu-bar open' : 'menu-bar'} />
          <div className={isMenuOpen ? 'menu-bar open' : 'menu-bar'} />
        </div>
        <h1 className='header-title'>{props.title}</h1>
      </div>
      {isMenuOpen && (
        <nav className={isMenuOpen ? 'drop-down-nav open' : 'drop-down-nav'}>
          <ul>
            <li onClick={() => handleLogOut()}>Log Out</li>
          </ul>
        </nav>
      )}
    </header>
  )
}