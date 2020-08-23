import React from 'react'
import { navigate, Link } from '@reach/router'
import { useCookies } from 'react-cookie'

import navReducer from '../../utils/nav-reducer'

import './user-dashboard.scss'
import Header from '../header'
import NavSlideOut from '../nav-slide-out'

import BrainIcon from '../../assets/svg/sticker-style/045-brain-2.svg'
import CreateDecksIcon from '../../assets/svg/sketch-style/014-project-plan.svg'
import ReadNotesIcon from '../../assets/svg/sketch-style/099-education.svg'
import StudyIcon from '../../assets/svg/sketch-style/084-technology-6.svg'
import StudyStatsIcon from '../../assets/svg/sketch-style/157-interface-15.svg'
import ViewCardsIcon from '../../assets/svg/sketch-style/018-layers.svg'
import ViewDecksIcon from '../../assets/svg/sketch-style/008-cubes-stack.svg'
import WriteCardIcon from '../../assets/svg/sketch-style/005-draw.svg'
import WriteNotesIcon from '../../assets/svg/sketch-style/022-interface-2.svg'

export default function UserDashboard () {
  const [cookies] = useCookies(['authToken'])
  const [navState, navDispatch] = React.useReducer(navReducer)

  const navIcons = [
    {
      icon: ViewCardsIcon,
      name: 'View Cards',
      pathName: 'view-cards'
    },{
      icon: ViewDecksIcon,
      name: 'View Decks',
      pathName: 'view-decks'
    },{
      icon: ReadNotesIcon,
      name: 'Read Notes',
      pathName: 'read-notes'
    },{
      icon: WriteCardIcon,
      name: 'Write Card',
      pathName: 'write-card'
    },{
      icon: CreateDecksIcon,
      name: 'Create Deck',
      pathName: 'create-deck'
    },{
      icon: WriteNotesIcon,
      name: 'Write Note',
      pathName: 'write-note'
    },{
      icon: StudyIcon,
      name: 'Study',
      pathName: 'study'
    },{
      icon: StudyStatsIcon,
      name: 'Study Stats',
      pathName: 'study-stats'
    }
  ]

  React.useEffect(() => {
    navDispatch({ type: 'CLOSE' })
  }, [])

  React.useEffect(() => {
    if (!cookies.authToken) {
      navigate('/')
    }
  }, [cookies])
  
  return (
    <div className='page user-dashboard-page'>
      <NavSlideOut
        navState={navState}
        navDispatch={navDispatch}
      />
      <Header
        cornerIcon={BrainIcon}
        navState={navState}
        navDispatch={navDispatch}
        title={"Welcome!"}
      />
      <main className='main user-dashboard-container'>
        <div className='nav-icons-container'>
          {navIcons.length > 0 && navIcons.map(navIcon => (
            <Link
              key={navIcon.pathName}
              to={`/${navIcon.pathName}`}
              className='user-dashboard-nav-icon'
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
        </div>
      </main>
    </div>
  )
}