import { useState } from 'react'
import { Link } from 'react-router-dom'

import "./Header.scss"
import defaultIcon from "../assets/logo.png"
import { NavBar } from "./NavBar"
import { Menu } from './Menu'

export const Header = ({
  pageTitle,
  cornerIcon,
  isAuthed,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  console.log({isMenuOpen})

  return (
    <>
      <header className="page-header">
        <section className="corner-icon-container">
          <Link 
            to={!!isAuthed ? '/user' : '/'}
            tabIndex="0"
          >
            <button>
              <img
                className="icon"
                alt={cornerIcon?.altText || ''}
                title="Home"
                src={cornerIcon?.icon || defaultIcon}
              />
            </button>
          </Link>
        </section>

        <section className="header-main">
          <h1 className="header-title">
            {pageTitle || "ERROR: Title Missing"}
          </h1>
        </section>

        {!isAuthed && (
          <NavBar
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        )}
      </header>

      <Menu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
    </>
  )
}
