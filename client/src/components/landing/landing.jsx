import React from 'react'
import './landing.scss'
import Header from '../header'
import AuthForm from './auth-form'

export default function Landing () {
  return (
    <div className='landing-page'>
      <Header title="Let's get learning!"/>
      <main className='landing-container'>
        <AuthForm/>
      </main>
    </div>
  )
}