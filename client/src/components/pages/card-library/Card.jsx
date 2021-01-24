import React, { useState } from 'react'

import './Card.scss'
import AlertIcon from '../../../assets/svg/sketch-style/problem.svg'
import DeleteIcon from '../../../assets/svg/sketch-style/delete.svg'
import EditIcon from '../../../assets/svg/sketch-style/pencil.svg'
import FailureIcon from '../../../assets/svg/sticker-style/038-delete.svg'
import SuccessIcon from '../../../assets/svg/sticker-style/039-interface-6.svg'
import ViewIcon from '../../../assets/svg/sketch-style/show.svg'

export default function Card ({card}) {
	const [isFlipped, setIsFlipped] = useState(false)
	const [viewCardDetails, setViewCardDetails] = useState(false)

	return (
		<div
			className={isFlipped ? "card flipped" : "card"}
		>
			<div className="card-control-panel">
				{!card.answer || card.answer === "" && (
					<img
						alt="issue with card"
						className="card-alert-icon"
						src={AlertIcon}
						title="issue with card"
					/>
				)}
				<img
					alt="view card details"
					className="card-control-icon view"
					onClick={() => setViewCardDetails(!viewCardDetails)}
					src={ViewIcon}
					title="view card details"
				/>
				<img
					alt="edit card"
					className="card-control-icon edit"
					// onClick={() => handleEditCard()}
					src={EditIcon}
					title="edit card"
				/>
				<img
					alt="delete card"
					className="card-control-icon delete"
					// onClick={() => handleDeleteCard()}
					src={DeleteIcon}
					title="delete card"
				/>
			</div>

			<div
				className="card-content"
				onClick={() => setIsFlipped(!isFlipped)}
			>
				<div className="card-front">
					<p>{card.question}</p>
					{/* {viewCardDetailsPanel} */}
				</div>
				<div className="card-back">
					<p>{card.answer}</p>
					<img
						alt="failed attempt"
						className="attempt-icon failure"
						// onClick={() => logAttempt(false)}
						src={FailureIcon}
						title="Got the answer wrong!"
					/>
					{/* {viewCardDetailsPanel} */}
					<img
						alt="success attempt"
						className="attempt-icon success"
						// onClick={() => logAttempt(true)}
						src={SuccessIcon}
						title="Got the answer right!"
					/>
				</div>
			</div>
		</div>
	)
}