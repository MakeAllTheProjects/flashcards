import axios from 'axios'
import {
  useCallback,
  useMemo,
  useState,
} from 'react'
import { useParams } from 'react-router-dom'
import Creatable, { useCreatable } from 'react-select/creatable'
import { useCookies } from 'react-cookie'

import { baseURL } from '../App'
import './WriteCard.scss'
import editCardIcon from '../assets/svg/sketch-style/005-draw.svg'
import {
  PageWrapper
} from '../components'

export const WriteCard = () => {
  const { id: cardId } = useParams()
  const [ cookies ] = useCookies(['authToken'])
  const [answer, setAnswer] = useState('')
	const [question, setQuestion] = useState('')
	const [tags, setTags] = useState([])
	const [selectedTag, setSelectedTag] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const cardData = useMemo(
    () => ({
      question,
      answer,
      tag: {
        tagId: selectedTag?.id,
        tagLabel: selectedTag?.label
      }
    }),
    [
      question,
      answer,
      selectedTag
    ]
  )

  const createCard = useCallback(
    async () => {
      setIsLoading(true)
      await axios.post(
        `${baseURL}/api/cards/user/${cookies?.authToken?.user?.id || ''}`,
        cardData
      )
    },
    [
      cookies?.authToken?.user?.id,
      cardData,
    ]
  )

  const editCard = useCallback(
    async () => {
      await axios.put(
        `${baseURL}/api/cards/${cardId}/user/${cookies?.authToken?.user?.id || ''}`,
        cardData
      )
    },
    [
      cookies?.authToken?.user?.id,
      cardId,
      cardData,
    ]
  )

  const handleCreateCard = useCallback(
    (e) => {
      e.preventDefault()
      createCard()
        .then(res => {
          setAnswer('')
          setQuestion('')
          setIsLoading(false)
        })
        .catch(err => {
          console.error(err)
          setErrorMessage("Unable to create card.")
          setIsLoading(false)
        })
    },
    [createCard]
  )

  const handleEditCard = useCallback(
    (e) => {
      e.preventDefault()
      editCard()
        .then(res => {
          setIsLoading(false)
        })
        .catch(err => {
          console.error(err)
          setErrorMessage("Unable to edit card.")
          setIsLoading(false)
        })
    },
    [editCard]
  )

  const handleTagChange = useCallback(
    () => {},
    []
  )

  return (
    <PageWrapper
      isProtected
      pageTitle={`${!!cardId ? 'Edit' : 'Write'} Card`}
      cornerIcon={{
        icon: editCardIcon,
      }}
    >
      <form 
        className="card-form"
        onSubmit={
          e => !!cardId 
            ? handleEditCard(e) 
            : handleCreateCard(e)
        }
      >
        <textarea
          placeholder="Question..."
          value={question}
          onChange={e => setQuestion(e.target.value)}
          required
        />

        <textarea
          placeholder="Answer..."
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        />

        <input
          className="submit-button"
          type="submit"
          value={!!cardId ? "Edit Card" : "Create Card"}
        />
      </form>
    </PageWrapper>
  )
}
