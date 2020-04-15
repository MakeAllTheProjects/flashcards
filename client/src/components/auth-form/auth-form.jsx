import axios from 'axios'
import React, { useState } from 'react'
import { navigate } from '@reach/router'

import { storeAuth } from '../../utils/context/auth-context'

import './auth-form.scss'

axios.defaults.timeout = 30000
const authAxios = axios.create()

export default function AuthForm () {
  const [isNewUser, setIsNewUser] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [errMessage, setErrorMessage] = useState("")

  const userState = React.useContext(storeAuth)
  const { dispatch, state } = userState

  function handleAuth (e) {
    e.preventDefault()
    return authAxios.post(`/auth/${isNewUser ? 'signup' : 'login'}`, {
      username,
      password,
      email,
      firstname,
      lastname
    }).then(response => {
      if (response.data.errMessage) {
        setErrorMessage(response.data.errMessage)
      }
      if (response.data.token) {
        dispatch({type: 'authorized user', payload: {
          user: {
            id: response.data.user.id,
            username: response.data.user.username,
            firstname: response.data.user.firstname
          },
          token: response.data.token
        }})
        
        while (state.token === null) {
          console.log("wait for it")
          if (state.token !== null) {
            navigate('/home')
          }
        }
      }
    }).catch(error => {
      console.log(error)
      setErrorMessage("Server error. Please try again later.")
    })
  }

  return (
    <form className="auth-form">
      <h2>
        {
          isNewUser 
            ? "Let's start learning..." 
            : "Let's get back to learning..."
        }
      </h2>

      <input
        autoComplete="no password"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        type="text"
        required
      />

      {isNewUser && (
        <>          
          <input
            autoComplete="no password"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />

          <input
            autoComplete="no password"
            name="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="firstname"
            type="text"
            required
          />

          <input
            autoComplete="no password"
            name="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Lastname"
            type="text"
          />
        </>
      )}

      <input
        autoComplete="no password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        required
      />

      {isNewUser && (
        <>
          <input
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            type="password"
            required
          />

          {password !== confirmPassword && (
            <p className="password-confirm-error">Password must match confirmation</p>
          )}
        </>
      )}
      
      <button 
        className="auth-button"
        onClick={(e) => handleAuth(e)}
      >
        {
          isNewUser
            ? "Sign Up"  
            : "Login"
        }
      </button>

      <p className="auth-error-message">
        {errMessage}
      </p>

      <p
        className="new-user-toggle"
        onClick={() => setIsNewUser(!isNewUser)}
      >
        {
          isNewUser
            ? "Already have an account?"
            : "Don't have an account?"
        }
      </p>
    </form>
  )
}