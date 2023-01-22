import { useCookies } from 'react-cookie'

import './UserDashboard.scss'
import brainIcon from '../assets/svg/sticker-style/045-brain-2.svg'
import { PageWrapper } from '../components'

export const UserDashboard = () => {
  const [ cookies ] = useCookies(['authToken'])

  return (
    <PageWrapper
      isProtected
      pageTitle={`Welcome ${cookies?.authToken?.user?.firstname || ''}`}
      cornerIcon={{
        icon: brainIcon
      }}
    >
      <p>UserDashboard</p>
    </PageWrapper>
  )
}
