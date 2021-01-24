import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'

import { GlobalContext } from '../../App'

import './Menu.scss'

export default function Menu ({ isMenuOpen, setIsMenuOpen }) {
	const context = useContext(GlobalContext)
	const { state, dispatch } = context
	const [cookies, setCookie, removeCookie] = useCookies(['authToken'])
	const history = useHistory()

	const handleLogout = async () => {
		const expiredDate = new Date()
		await removeCookie('authToken', { expire: expiredDate })
		await dispatch({ type: 'LOGOUT' })
		await history.push('/')
	}

	return (
		<aside
			className="menu-container"
			style={{ right: isMenuOpen ? '0' : '-100%' }}
			onClick={() => setIsMenuOpen(!isMenuOpen)}
		>
			<nav
				className="menu"
				style={{ transform: isMenuOpen ? 'rotate(-17.5deg) skew(0)' : 'rotate(0) skew(25deg, -25deg)' }}
			>
				<p onClick={() => handleLogout()}>LOGOUT</p>
			</nav>
		</aside>
	)
}