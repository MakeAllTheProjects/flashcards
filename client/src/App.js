// import axios from 'axios'
import React from 'react'
import { Router } from '@reach/router'

import AppBackground from './components/app-background/AppBackground'
import NotFound from './components/pages/not-found/NotFound'

import './App.scss'

export const baseURL = process.env.REACT_APP_IS_PRODUCTION ? 'https://flashcourse.herokuapp.com/api' : 'http://localhost:8080/api'

export default function App () {
  return (
    <AppBackground>
      <div className="app">
        <Router>
          <NotFound path='/' />
          {/* <NotFound path='*' /> */}
          {/* <Landing path='/' /> */}
          {/* <UserDashboard path='/home' /> */}
          {/* <ViewCards path='/home' /> */}
          {/* <ViewCards path='/view-cards' /> */}
          {/* <NotAvailable path='/view-decks' /> */}
          {/* <NotAvailable path='/read-notes' /> */}
          {/* <CreateCard path='/write-card' /> */}
          {/* <NotAvailable path='/create-deck' /> */}
          {/* <NotAvailable path='/write-note' /> */}
          {/* <NotAvailable path='/study' /> */}
          {/* <NotAvailable path='/study-stats' /> */}
        </Router>
      </div>
    </AppBackground>
  )
}
