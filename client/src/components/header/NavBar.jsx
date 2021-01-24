import React from 'react'
import { Link } from 'react-router-dom'

import './NavBar.scss'
import CardLibraryIcon from '../../assets/svg/sketch-style/018-layers.svg'
import UserIcon from '../../assets/svg/sketch-style/user.svg'

const navList = [
	{
		name: "Card Library",
		icon: CardLibraryIcon,
		path: "/user/cards"
	}
]

export default function NavBar ({ isMenuOpen, setIsMenuOpen }) {
	return (
		<nav className="navbar-container">
			{navList.map(navLink => (
				<Link to={navLink.path}>
					<img
						key={`nav-link:${navLink.name.split(" ").join("")}`}
						className="nav-icon"
						src={navLink.icon}
						alt={navLink.name}
						title={navLink.name}
					/>
				</Link>
			))}
			<img
				className="nav-icon"
				src={UserIcon}
				alt="user menu"
				title="user menu"
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				style={{
					marginLeft: '2rem',
					marginTop: '0.5rem'
				}}
			/>
		</nav>
	)
}