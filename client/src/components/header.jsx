import React from 'react'
import './header.scss'
import DefaultLogo from '../assets/logo.png'

export default function Header ({title, cornerIcon}) {
  console.log(cornerIcon)
  return (
    <header className='app-header'>
      <div className='icon-container'>
        <img src={cornerIcon ? cornerIcon : DefaultLogo} className='header-logo' alt=''/>
      </div>
      <div className='header-main'>
        <h1 className='header-title'>{title}</h1>
      </div>
    </header>
  )
}