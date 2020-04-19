import React from 'react'

import { storeAuth } from '../../utils/context/auth-context'

import './user-dashboard.scss'
import Header from '../header/header'

export default function UserDashboard () {
  const authState = React.useContext(storeAuth)
  const { state } = authState

  return (
    <>
      <Header/>
      <main className="user-dashboard">
        <h1>Welcome, {state.user.firstname ? state.user.firstname : "learner"}!</h1>
      </main>
    </>
  )
}