import axios from 'axios'
import { 
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useCookies } from 'react-cookie'

import './CardLibrary.scss'
import viewCardsIcon from '../assets/svg/sketch-style/018-layers.svg'
import { PageWrapper } from '../components'
import { baseURL } from '../App'

export const CardLibrary = () => {
  const [cookies, setCookie] = useCookies(['authToken'])
  const [ isLoading, setIsLoading ] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [cards, setCards] = useState([])

  const axiosUser = useMemo(
    () => axios.create({
			headers: {
				Authorization: `Bearer ${cookies?.authToken?.token}`
			}
		}),
    [cookies?.authToken?.token]
  )

  const fetchCards = useCallback(
    async () => {
      setIsLoading(true)
      const results = await axiosUser.get(`${baseURL}/api/cards/user/${cookies?.authToken?.user?.id || ''}`)
      return results
    },
    [
      cookies?.authToken?.user?.id, 
      axiosUser
    ]
  )

  const getCards = useCallback(
    () => {
      fetchCards()
        .then(res => {
          console.log(res?.data?.cards)
          setCards(res?.data?.cards || [])
          setIsLoading(false)
        })
        .catch(err => {
          console.error(err)
          setErrorMessage("Unable to fetch cards.")
        })
    },
    [ fetchCards ]
  )

  useEffect(() => {
    getCards()
  }, [])

  return (
    <PageWrapper
      pageTitle="Card Library"
      cornerIcon={{
        icon: viewCardsIcon
      }}
    >
      Card Library
    </PageWrapper>
  )
}
