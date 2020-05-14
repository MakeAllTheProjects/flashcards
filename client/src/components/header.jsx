import React from 'react'
import './header.scss'

export default function Header ({title}) {
  return (
    <header className='app-header'>
      <div className='icon-container'>
        icon here
      </div>
      <div className='header-main'>
        <h1 className='header-title'>{title}</h1>
      </div>
    </header>
  )
}