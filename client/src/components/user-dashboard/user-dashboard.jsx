import React from 'react'

import { storeAuth } from '../../utils/context/auth-context'

import './user-dashboard.scss'

export default function UserDashboard () {
  const authState = React.useContext(storeAuth)
  const { state } = authState

  return (
    <div className="user-dashboard">
      <h1>Welcome, {state.user.firstname ? state.user.firstname : "learner"}!</h1>
    </div>
  )
}