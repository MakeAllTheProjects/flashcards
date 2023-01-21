import React from 'react'
import {
  // Route,
  Routes
} from 'react-router-dom'

import './App.scss'
import { AppBackground } from './components/AppBackground'

export const App = () => {
  return (
    <div className="App">
      <AppBackground>
        <Routes>

        </Routes>
      </AppBackground>
    </div>
  )
}