import React from 'react'
import { Link } from 'react-router-dom'

import './NavBar.scss'
import CardLibraryIcon from '../../assets/svg/sketch-style/018-layers.svg'
import UserIcon from '../../assets/svg/sketch-style/user.svg'
import WriteCardIcon from '../../assets/svg/sketch-style/005-draw.svg'

const navList = [
	{
		name: "Card Library",
		icon: CardLibraryIcon,
		path: "/user/cards"
	},
	{
		name: "Write Card",
		icon: WriteCardIcon,
		path: "/user/cards/write"
	}
]

export default function NavBar ({ isMenuOpen, setIsMenuOpen }) {
	return (
		<nav className="navbar-container">
			{navList.map(navLink => (
				<Link 
					key={`nav-link:${navLink.name.split(" ").join("")}`}
					to={navLink.path}
				>
					<img
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
					margin: '1.5rem 0 0 2rem',
					filter: 'hue-rotate(230deg)'
				}}
			/>
		</nav>
	)
}