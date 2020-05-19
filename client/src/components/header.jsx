import React from 'react'
import './header.scss'
import DefaultLogo from '../assets/logo.png'
import NavSlideOutContainer from './nav-slide-out'

export default function Header ({title, cornerIcon}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  
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
      <NavSlideOutContainer isMenuOpen={isMenuOpen}/>
    </header>
  )
}