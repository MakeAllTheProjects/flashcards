import React from 'react'

import './NavBar.scss'
import UserIcon from '../../assets/svg/sketch-style/user.svg'

export default function NavBar ({ isMenuOpen, setIsMenuOpen }) {
	return (
		<nav className="navbar-container">
			<img
				className="nav-icon"
				src={UserIcon}
				alt="user menu"
				title="user menu"
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			/>
		</nav>
	)
}