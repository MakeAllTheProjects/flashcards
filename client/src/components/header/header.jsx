import React from 'react'
import { useCookies } from 'react-cookie'
import { navigate } from '@reach/router'

import { storeAuth } from '../../utils/context/auth-context'

import './header.scss'

export default function Header () {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const authState = React.useContext(storeAuth)
  const { state, dispatch } = authState
  const [ cookies, removeCookie ] = useCookies(['authToken'])

  function handleLogOut () {
    dispatch({
      type: 'logout user'
    })
    removeCookie('authToken')
    navigate('/')
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