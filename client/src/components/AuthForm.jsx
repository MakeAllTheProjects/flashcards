import {
  useCallback,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import './AuthForm.scss'
import { baseURL } from '../App'

export const AuthForm = () => {
  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies(['authToken'])
  const [isLoading, setIsLoading] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)
  const [username, setUsername] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errMessage, setErrorMessage] = useState('')

  const handleAuth = useCallback(
    async (e) => {
      e.preventDefault()
      setIsLoading(true)

      const loginUser = {
        username,
        password
      }
      const signupUser = {
        ...loginUser,
        firstname,
        lastname,
        email,
      }
      
      await axios.post(
        `${baseURL}/auth/${isNewUser ? 'signup' : 'login'}`,
        isNewUser ? signupUser : loginUser
      )
        .then(res => {
          if (res?.data?.user && res?.data?.token) {
            const { user, token } = res.data

            setCookie(
              'authToken',
              {
                user: {
                  id: user?.id,
                  username: user?.username,
                  firstname: username?.firstname,
                },
                token
              },
              { path: '/'}
            )
          }
        })
        .then(() => {
          navigate.push('/user')
        })
        .catch(err => {
          console.error(err)
          setErrorMessage(`${isNewUser ? 'Sign up' : 'Login'} failed. Please try again later.`)
        })
    },
    [
      isNewUser,
      username,
      firstname,
      lastname,
      email,
      password,
      navigate,
      setCookie,
    ]
  )

  return (
    <form
      className="auth-form"
      autoComplete='off'
      onSubmit={e => handleAuth(e)}
    >
      <h2>
        {isNewUser 
          ? 'Sign up to start studying...' 
          : 'Login and get back to studying...'
        }
      </h2>

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
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						type="email"
						required
					/>

					<input
						name="firstname"
						value={firstname}
						onChange={(e) => setFirstname(e.target.value)}
						placeholder="firstname"
						type="text"
						required
					/>

					<input
						name="lastname"
						value={lastname}
						onChange={(e) => setLastname(e.target.value)}
						placeholder="Lastname"
						type="text"
					/>
				</>
			)}

      <input
				name="password"
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

      <p className="auth-error-message">
				{errMessage}
			</p>

			<input
				className="auth-button"
				type="submit"
				value={isNewUser ? "Sign Up" : "Login"}
			/>

      <button
				className="new-user-toggle"
				onClick={() => setIsNewUser(!isNewUser)}
			>
				{
					isNewUser
						? "Already have an account?"
						: "Don't have an account?"
				}
			</button>
    </form>
  )
}
