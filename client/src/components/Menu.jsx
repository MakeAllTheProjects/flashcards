import { useCallback } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import './Menu.scss'

export const Menu = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(['authToken'])
	const navigate = useNavigate()

  const handleLogout = useCallback(
    async () => {
      await removeCookie(
        'authToken',
        { expire: dayjs() }
      )
    },
    [removeCookie]
  )

  return (
    <menu
      className="menu-container"
      style={{ right: isMenuOpen ? '0' : '-100%' }}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-hidden={!isMenuOpen}
    >
      <button
        className="logout"
        onClick={() => {
          handleLogout()
            .then(() => navigate('/'))
        }}
      >
        LOGOUT
      </button>
    </menu>
  )
}
