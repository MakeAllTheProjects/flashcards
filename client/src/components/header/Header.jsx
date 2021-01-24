import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Menu from './Menu'
import NavBar from './NavBar'

import './Header.scss'
import defaultLogo from '../../assets/logo.png'

export default function Header ({ title, cornerIcon }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<>
			<header className='app-header'>
				<div className="corner-icon">
					<Link to="/">
						<img
							alt="home"
							className='header-logo'
							src={cornerIcon ? cornerIcon : defaultLogo}
							title="home"
						/>
					</Link>
				</div>
				<div className="header-main">
					<h1 className="header-title">{title ? title : "ERROR: Title Missing"}</h1>
				</div>
				<NavBar
					isMenuOpen={isMenuOpen}
					setIsMenuOpen={setIsMenuOpen}
				/>
			</header>
			<Menu
				isMenuOpen={isMenuOpen}
				setIsMenuOpen={setIsMenuOpen}
			/>
		</>
	)
}