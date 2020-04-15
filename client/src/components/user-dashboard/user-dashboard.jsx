import React from 'react'

import { storeAuth } from '../../utils/context/auth-context'

import './user-dashboard.scss'

export default function UserDashboard () {
  const authState = React.useContext(storeAuth)
  const { state } = authState
  const { user } = state
  const { firstname } = state

  console.log(firstname)

  return (
    <div className="user-dashboard">
      <h1>Welcome, {firstname ? firstname : "learner"}!</h1>
    </div>
  )
}