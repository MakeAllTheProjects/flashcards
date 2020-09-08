import React from 'react'
import { navigate, Link } from '@reach/router'
import { useCookies } from 'react-cookie'

import navReducer from '../../utils/nav-reducer'

import './user-dashboard.scss'
import Header from '../header'
import MenuSlideOut from '../menu-slide-out'
import NavBar from '../nav-bar'

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
  const [isCookie, setIsCookie] = React.useState(false)

  const navIcons = [
    {
      icon: ViewCardsIcon,
      name: 'View Cards',
      pathName: 'view-cards'
    },{
      icon: WriteCardIcon,
      name: 'Write Card',
      pathName: 'write-card'
    },{
      icon: ViewDecksIcon,
      name: 'View Decks',
      pathName: 'view-decks'
    },{
      icon: CreateDecksIcon,
      name: 'Create Deck',
      pathName: 'create-deck'
    },{
      icon: ReadNotesIcon,
      name: 'Read Notes',
      pathName: 'read-notes'
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
    setIsCookie(cookies.authToken ? true : false)
    if (!cookies.authToken) {
      navigate('/')
    }
  }, [cookies])

  if (isCookie) {  
    return (
      <div className='page user-dashboard-page'>
        <MenuSlideOut
          navState={navState}
          navDispatch={navDispatch}
        />
        <NavBar/>
        <Header
          cornerIcon={BrainIcon}
          navState={navState}
          navDispatch={navDispatch}
          title={""}
        />
        <main className='main user-dashboard-container'>

        </main>
      </div>
    )
  } else {
    return (
      < div className = 'page user-dashboard-page' >
        <h2>Loading, please wait...</h2>
      </div>
    )
  }
}