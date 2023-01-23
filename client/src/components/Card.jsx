import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import './Card.scss'
import alertIcon from '../assets/svg/sketch-style/problem.svg'
import deleteIcon from '../assets/svg/sketch-style/delete.svg'
import editIcon from '../assets/svg/sketch-style/pencil.svg'
import failureIcon from '../assets/svg/sticker-style/038-delete.svg'
import successIcon from '../assets/svg/sticker-style/039-interface-6.svg'
import viewIcon from '../assets/svg/sketch-style/show.svg'
import { AttemptDetails } from './AttemptDetails'

const cardColors = {
  0: "rgb(84, 205, 242)",
  1: "rgb(175, 247, 42)",
  2: "rgb(248, 229, 58)",
  3: "rgb(252, 183, 18)",
  4: "rgb(241, 126, 176)",
}

export const Card = ({
  card,
  index
}) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [viewCardDetails, setViewCardDetails] = useState(false)

  const cardColor = useMemo(
    () => cardColors[(+index)%5],
    [index]
  )
  
  const recentAttempts = useMemo(
    () => card.attempts?.length > 10 ? card.attempts.slice(0, 10) : card.attempts,
    [card]
  )

  const handleEditCard = useCallback(
    () => {
      //TODO
    },
    []
  )

  const handleDeleteCardConfirmation = useCallback(
    () => {
      //TODO
    },
    []
  )

  const logAttempt = useCallback(
    () => {
      //TODO
    },
    []
  )

  return (
    <article
      className="card-container"
    >
      <div
				className={isFlipped ? "card flipped" : "card"}
			>
        <menu className='card-control-panel'>
          {card.answer === "" && (
						<img
							alt=""
							className="card-alert-icon"
							src={alertIcon}
							title="Question needs answered."
						/>
					)}
          
          <button
            className="card-control-button"
            onClick={() => setViewCardDetails(!viewCardDetails)}
          >
            <img
              className="card-control-icon view"
              alt=""
              title="View card details"
              src={viewIcon}
            />
          </button>

          <button
            className="card-control-button"
            onClick={() => handleEditCard(card.id)}
          >
            <img
              className="card-control-icon edit"
              alt=""
              title="edit card"
              src={editIcon}
            />
          </button>

          <button
            className="card-control-button"
            onClick={() => handleDeleteCardConfirmation(card.id)}
          >
            <img
              className="card-control-icon delete"
              alt=""
              title="delete card"
              src={deleteIcon}
            />
          </button>
        </menu>

        <button
          className="card-content"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <section 
            className="card-front"
            style={{ backgroundColor: cardColor }}
          >
            <p className="card-text">
              {card.question}
            </p>

            {viewCardDetails && (
							<AttemptDetails
								viewCardDetails={viewCardDetails}
								recentAttempts={recentAttempts}
							/>
						)}
          </section>

          <section 
            className="card-back"
            style={{ backgroundColor: cardColor }}
          >
            <p className="card-text">
              {card.answer}
            </p>

            <button
              className="attempt-icon failure"
              onClick={() => logAttempt(false)}
            >
              <img
                alt="failed attempt"
                title="Got the answer wrong!"
                src={failureIcon}
              />
            </button>

            {viewCardDetails && (
							<AttemptDetails
								viewCardDetails={viewCardDetails}
								recentAttempts={card.attempts.length > 10 ? card.attempts.slice(0, 10) : card.attempts}
							/>
						)}

            <button
              className="attempt-icon success"
              onClick={() => logAttempt(true)}
            >
              <img
                alt="success attempt"
                title="Got the answer right!"
                src={successIcon}
              />
            </button>
          </section>

        </button>

      </div>

    </article>
  )
}
