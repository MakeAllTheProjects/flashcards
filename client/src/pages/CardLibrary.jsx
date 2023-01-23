import axios from 'axios'
import { 
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import './CardLibrary.scss'
import viewCardsIcon from '../assets/svg/sketch-style/018-layers.svg'
import { PageWrapper, Card } from '../components'
import { baseURL } from '../App'

export const CardLibrary = () => {
  const navigate = useNavigate()
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

  const filterCards = useMemo(
    () => {
      const newCardsList = !!cards?.length ? [...cards] : []
      return newCardsList
    },
    [cards]
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

  const deleteCard = useCallback(
    async (cardId) => {
      setIsLoading(true)
      const results = await axiosUser.delete(`${baseURL}/${cardId}/user/${cookies?.authToken?.user?.id}`)
      return results
    },
    [
      axiosUser,
      cookies?.authToken?.user?.id,
      setIsLoading,
    ]
  )

  const handleDeleteCardConfirmation = useCallback(
    (cardId, setShowModal) => {
      deleteCard(cardId)
        .then(res => {
          setCards(res?.data?.cards || [])
        })
        .then(() => {
          setShowModal(false)
          setIsLoading(false)
        })
        .catch(err => {
          console.error(err)
          setErrorMessage("Unable to delete card.")
        })
    },
    [deleteCard]
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
      {!filterCards?.length && (
        <>
          <p>Looks like you haven't created any cards yet.</p>
          <button
            className="creat-card"
            onClick={() => navigate('/user/cards/write')}
          >
            Create a Card
          </button>
        </>
      )}

      <section className="card-list-container">
        {filterCards?.map((card, i) => (
          <Card
            key={`card:${card.id}`}
            card={card}
            index={i}
            setIsLoading={setIsLoading}
            setCards={setCards}
            handleDeleteCardConfirmation={handleDeleteCardConfirmation}
          />
        ))}
      </section>
    </PageWrapper>
  )
}
