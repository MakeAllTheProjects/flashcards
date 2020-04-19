import React from 'react'
import { 
  AppBar,
  Drawer,
  ThemeProvider  
} from '@material-ui/core';

import { theme } from '../../utils/context/theme-context'

import './header.scss'

export default function Header () {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar>
          <div
            className='menu-button'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={isMenuOpen ? 'menu-bar open' : 'menu-bar'}/>
            <div className={isMenuOpen ? 'menu-bar open' : 'menu-bar'}/>
            <div className={isMenuOpen ? 'menu-bar open' : 'menu-bar'}/>
          </div>
        </AppBar>
      </ThemeProvider>
      <Drawer
        anchor='left'
        variant='temporary'
        open={isMenuOpen}
        onClick={() => setIsMenuOpen(false)}
        className='menu-drawer'
      >
        <p>Logout</p>
      </Drawer>
    </>
  )
}