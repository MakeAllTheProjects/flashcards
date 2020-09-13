import React from 'react'
import {Link} from '@reach/router'

import './nav-bar.scss'

import CreateDecksIcon from '../assets/svg/sketch-style/014-project-plan.svg'
import ReadNotesIcon from '../assets/svg/sketch-style/099-education.svg'
import StudyIcon from '../assets/svg/sketch-style/084-technology-6.svg'
import StudyStatsIcon from '../assets/svg/sketch-style/157-interface-15.svg'
import ViewCardsIcon from '../assets/svg/sketch-style/018-layers.svg'
import ViewDecksIcon from '../assets/svg/sketch-style/008-cubes-stack.svg'
import WriteCardIcon from '../assets/svg/sketch-style/005-draw.svg'
import WriteNotesIcon from '../assets/svg/sketch-style/022-interface-2.svg'

export default function NavBar () {
	const navIcons = [
		{
			icon: ViewCardsIcon,
			name: 'View Cards',
			pathName: 'view-cards'
		}, {
			icon: WriteCardIcon,
			name: 'Write Card',
			pathName: 'write-card'
		}
		// }, {
		// 	icon: ViewDecksIcon,
		// 	name: 'View Decks',
		// 	pathName: 'view-decks'
		// }, {
		// 	icon: CreateDecksIcon,
		// 	name: 'Create Deck',
		// 	pathName: 'create-deck'
		// }, {
		// 	icon: ReadNotesIcon,
		// 	name: 'Read Notes',
		// 	pathName: 'read-notes'
		// }, {
		// 	icon: WriteNotesIcon,
		// 	name: 'Write Note',
		// 	pathName: 'write-note'
		// }, {
		// 	icon: StudyIcon,
		// 	name: 'Study',
		// 	pathName: 'study'
		// }, {
		// 	icon: StudyStatsIcon,
		// 	name: 'Study Stats',
		// 	pathName: 'study-stats'
		// }
	]
	
	return (
		<nav className="nav-bar">
			{navIcons.length > 0 && navIcons.map(navIcon => (
				<Link
					key={navIcon.pathName}
					to={`/${navIcon.pathName}`}
					className='nav-icon'
				>
					<img
						alt={navIcon.name}
						className='icon-image'
						title={navIcon.name}
						src={navIcon.icon}
					/>
					<p className='icon-text'>{navIcon.name}</p>
				</Link>
			))}
		</nav>
	)
}