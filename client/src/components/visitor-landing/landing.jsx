import React from 'react'

import './landing.scss'

import AuthForm from '../auth-form/auth-form'

export default function Landing () {
  return (
    <div className="landing">
      <h1>Welcome!</h1>
      <AuthForm/>
    </div>
  )
}
