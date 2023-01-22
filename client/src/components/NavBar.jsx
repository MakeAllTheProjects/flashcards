import React from 'react'
import { Link } from 'react-router-dom'

import './NavBar.scss'
import cardLibraryIcon from '../assets/svg/sketch-style/018-layers.svg'
import userIcon from '../assets/svg/sketch-style/user.svg'
import writeCardIcon from '../assets/svg/sketch-style/005-draw.svg'

const navList = [
	{
		name: "Card Library",
		icon: cardLibraryIcon,
		path: "/user/cards",
    altText: ""
	},
	{
		name: "Write Card",
		icon: writeCardIcon,
		path: "/user/cards/write",
    altText: ""
	}
]

export const NavBar = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  return (
    <nav className="navbar-container">
      {navList.map(navLink => (
        <Link
          key={`nav-link:${navLink.name.split(" ").join("")}`}
          to={navLink.path}
          className="nav-button"
        >
          <button>
            <img
              className="nav-icon"
              src={navLink.icon}
              alt={navLink.altText}
              title={navLink.name}
            />
          </button>
        </Link>
      ))}

      <button 
        className="menu-button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <img
          className="nav-icon user-menu-icon"
          alt=""
          title="User Menu"
          src={userIcon}
        />
      </button>
    </nav>
  )
}
