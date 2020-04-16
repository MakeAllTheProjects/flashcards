import React from 'react'
import { Router } from '@reach/router'

import './App.scss'

import Landing from './components/visitor-landing/landing'
import UserDashboard from './components/user-dashboard/user-dashboard'

export default function App() {
  return (
    <div className="App">
      <Router>
        <Landing path="/"/>
        <UserDashboard path="/home" />
      </Router>
    </div>
  )
}
