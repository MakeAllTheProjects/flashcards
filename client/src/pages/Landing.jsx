import { useState } from 'react'

import './Landing.scss'
import { 
  AuthForm,
  ForgottenPasswordForm,
  PageWrapper, 
} from '../components'

export const Landing = () => {
  const [passIsForgotten, setPassIsForgotten] = useState(false)

  return (
    <PageWrapper 
      altPath="/user"
      pageTitle="Welcome to FlashCourse"
    >
      {passIsForgotten 
        ? <ForgottenPasswordForm/>
        : <AuthForm/>
      }

      <button
        className="forgot"
        onClick={() => setPassIsForgotten(!passIsForgotten)}
      >
        {passIsForgotten ? "Back to login" : "Forgot your password?"}
      </button>
    </PageWrapper>
  )
}
