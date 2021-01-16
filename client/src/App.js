import axios from 'axios'
import React, { useEffect, useReducer } from 'react'
import './App.scss'
import AppBackground from './components/app-background/AppBackground'

export const baseURL = process.env.REACT_APP_IS_PRODUCTION ? 'https://flashcourse.herokuapp.com/api' : 'http://localhost:8080/api'

export default function App () {
  return (
    <AppBackground>
      <div className="app">
        App
      </div>
    </AppBackground>
  )
}
