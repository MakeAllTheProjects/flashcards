import React from 'react'
import {
  Route,
  Routes
} from 'react-router-dom'

import './App.scss'
import {
  CardLibrary,
  DemoAccess,
  Landing,
  NotFound,
  UserDashboard,
  WriteCard,
} from './pages'

import './App.scss'

export const baseURL = process.env.REACT_APP_IS_PRODUCTION ? 'https://flash-course.herokuapp.com' : 'http://localhost:8080'

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
          path="/user/cards/write"
          element={<WriteCard/>}
        />
        <Route
          path="/user/cards/edit/:id"
          element={<WriteCard/>}
        />
        <Route
          path="/user/cards"
          element={<CardLibrary/>}
        />
        <Route 
          path="*" 
          element={<NotFound/>}
        />
      </Routes>
    </div>
  )
}