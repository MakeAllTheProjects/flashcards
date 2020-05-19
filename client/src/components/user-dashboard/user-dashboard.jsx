import React from 'react'
import { useCookies } from 'react-cookie'
import { navigate } from '@reach/router'

import './user-dashboard.scss'
import Header from '../header'
import BrainIcon from '../../assets/svg/045-brain-2.svg'

export default function UserDashboard () {
  const [cookies, setCookie] = useCookies(['authToken'])

  React.useEffect(() => {
    console.log(cookies)
    if (!cookies.authToken) {
      navigate('/')
    }
  }, [cookies])
  
  return (
    <div className='user-dashboard-page'>
      <Header title="Welcome!" cornerIcon={BrainIcon}/>
      <main className='user-dashboard-container'>
        dashboard stuff goes here
      </main>
    </div>
  )
}