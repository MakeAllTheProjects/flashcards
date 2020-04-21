import React from 'react'

import './cards-list.scss'
import Card from './card'
import { storeUser } from '../../utils/context/user-context'



export default function CardsList (props) {
  const [cardsList, setCardsList] = React.useState([])
  const userProvider = React.useContext(storeUser)
  const { state, dispatch } = userProvider
  
  React.useEffect(() => {
    setCardsList([...state.cards])
  }, [state.cards])

  return (
    <div className='cards-list-container'>
      { state.cards.length > 0 
        ? (<p>You have {state.cards.length} card{state.cards.length !== 1 ? 's' : ''}!</p>)
        : (<p>You have no cards!</p>)
      }
      {cardsList.length > 0 && cardsList.map(card => {
        return (
          <Card
            key={card.id}
            question={card.question}
            answer={card.answer}
          />
        )
      })}
    </div>
  )
}