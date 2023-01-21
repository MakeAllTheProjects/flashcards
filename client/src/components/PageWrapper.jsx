import React, {
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import './PageWrapper.scss'
import { AppBackground } from './AppBackground'

export const PageWrapper = ({
  children,
  isProtected,
  altPath,
  // pageTitle,
}) => {
  const navigate = useNavigate()
  const [ cookies ] = useCookies(['authToken'])

  const isAuthed = useMemo(
    () => cookies?.authToken?.token && cookies?.authToken?.user,
    [
      cookies?.authToken?.token,
      cookies?.authToken?.user,
    ]
  )

  const handleRedirect = useCallback(
    () => {
      if (
        !isAuthed && !!isProtected
      ) {
        navigate('/')
      }
      if (!!isAuthed && !!altPath) {
        navigate(altPath)
      }
    },
    [
      isAuthed,
      isProtected,
      navigate,
      altPath,
    ]
  )

  useEffect(
    () => {
      handleRedirect()
    },
    [handleRedirect]
  )

  return (
    <AppBackground>
      {/* <Header/> */}
      {children}
    </AppBackground>
  )
}