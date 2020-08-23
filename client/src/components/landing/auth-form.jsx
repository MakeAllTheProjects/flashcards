import axios from 'axios'
import React, { useState, useReducer } from 'react'
import { Redirect } from '@reach/router'
import { useCookies } from 'react-cookie'

import userReducer from '../../utils/user-reducer'

import './auth-form.scss'

export default function AuthForm () {
  const [isNewUser, setIsNewUser] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [errMessage, setErrorMessage] = useState("")
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(['authToken'])
  // eslint-disable-next-line
  const [userState, userDispatch] = useReducer(userReducer)

  axios.defaults.timeout = 30000
  const authAxios = axios.create()

  const handleAuth = async (e) => {
    e.preventDefault()

    return await authAxios.post(`/auth/${isNewUser ? 'signup' : 'login'}`, {
      username,
      password,
      email,
      firstname,
      lastname
    }).then(async response => {
      if (response.data.errMessage) {
        setErrorMessage(response.data.errMessage)
      }

      if (response.data.user && response.data.token) {
        const user = response.data.user
        userDispatch({
          type: 'LOGIN',
          id: user.id,
          username: user.username,
          firstname: user.firstname
        })

        setCookie(
          'authToken',
          {
            user: {
              id: user.id,
              username: user.username
            },
            token: response.data.token
          },
          { path: '/' }
        )
      }
    }).catch(async err => {
      console.error(err)
      await setErrorMessage('Server error. Please try again later.')
    })
  }

  if (!cookies.authToken) {
    return (
      <form className='auth-form' autoComplete='off'>
        <h2>{isNewUser ? 'Sign up to start learning...' : 'Login to get back to learning...'}</h2>

        <input name="username" type='text' className='fake-input' />
        <input type='password' className='fake-input' />

        <input
          autoComplete="no password"
          name="real-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          type="text"
          required
        />

        {isNewUser && (
          <>
            <input
              autoComplete="chrome-off"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
            />

            <input
              autoComplete="chrome-off"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="firstname"
              type="text"
              required
            />

            <input
              autoComplete="chrome-off"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Lastname"
              type="text"
            />
          </>
        )}

        <input
          autoComplete="chrome-off"
          name="real-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          required
        />

        {isNewUser && (
          <input
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            type="password"
            required
          />
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

        {isNewUser && password !== confirmPassword && <p className="password-confirm-error">Password must match confirmation</p>}
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
  } else {
    return (<Redirect from='/' to='/home' />)
  }
}