import axios from 'axios'
import { 
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import './DemoAccess.scss'
import { baseURL } from '../App'
import { PageWrapper } from '../components'

export const DemoAccess = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(['authToken'])
  const [demoLoadingMessage, setDemoLoadingMessage] = useState("Please wait while the demo is loading...")

  const accessDemo = useCallback(
    () => {
      axios.post(`${baseURL}/auth/login/demo`)
        .then(res => {
          if (res?.data?.user && res?.data?.token) {
            const { user, token } = res.data
            setCookie(
              'authToken',
              {
                user: {
                  id: user.id,
                  username: user.username,
                  firstname: user.firstname,
                },
                token
              },
              { path: "/" }
            )
          }
        })
        .then(() => {
          navigate("/user")
        })
        .catch(err => {
          console.error(err)
          setDemoLoadingMessage("Demo is unable to load. Please try again later...")
        })
    },
    [
      navigate,
      setCookie,
    ]
  )

  useEffect(
    () => {
      accessDemo()
    }, 
    [accessDemo]
  )

  return (
    <PageWrapper
      altPath="/user"
      pageTitle="Accessing Demo"
    >
      <p>{demoLoadingMessage}</p>
    </PageWrapper>
  )
}
