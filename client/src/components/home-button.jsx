import React from 'react'
import { Link } from '@reach/router'

import HomeIcon from '../assets/svg/sketch-style/home-sketch.svg'

export default function HomeButton (props) {
	return (
		<Link to="/">
			<img
				className="home-button"
				title="home"
				alt="home"
				src={HomeIcon}
			/>
		</Link>
	)
}