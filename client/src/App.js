import React from 'react'
import {
  Route,
  Routes
} from 'react-router-dom'

import './App.scss'
import {
  DemoAccess,
  Landing,
  NotFound,
  UserDashboard,
} from './pages'

import './App.scss'

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Landing/>}
        />
        <Route
          path="/demo"
          element={<DemoAccess/>}
        />
        <Route
          path="/user"
          element={<UserDashboard/>}
        />
        <Route 
          path="*" 
          element={<NotFound/>}
        />
      </Routes>
    </div>
  )
}