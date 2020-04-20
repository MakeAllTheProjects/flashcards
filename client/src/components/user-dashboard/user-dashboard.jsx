import React from 'react'

import { storeUser } from '../../utils/context/user-context'

import './user-dashboard.scss'
import Header from '../header/header'

export default function UserDashboard () {
  const [errMessage, setErrorMessage] = React.useState('')
  const userProvider = React.useContext(storeUser)
  const { state, dispatch } = userProvider
  const { cards } = state

  React.useEffect(() => {
    console.log('get some cards')

  }, [])

  return (
    <>
      <Header/>
      <main className="user-dashboard">
        <h1>Welcome, {state.user.firstname ? state.user.firstname : "learner"}!</h1>
        <p className='errMessage'>{errMessage}</p>
        
      </main>
    </>
  )
}