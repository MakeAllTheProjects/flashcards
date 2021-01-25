import React, { useContext, useEffect, useState } from 'react'

import { GlobalContext } from '../App'
import './MessageBanner.scss'

export default function MessageBanner () {
	const context = useContext(GlobalContext)
	const { state, dispatch } = context
	const [opacity, setOpacity] = useState(0)

	useEffect(() => {
		console.log(state.message)
		if (state.message.length > 0) {
			setOpacity(100)
			setTimeout(() => {
				setOpacity(75)
				setTimeout(() => {
					setOpacity(50)
					setTimeout(() => {
						setOpacity(25)
						setTimeout(() => {
							setOpacity(0)
							dispatch({
								type: 'SET_MESSAGE',
								payload: {
									message: ''
								}
							})
						}, 500)
					}, 500)
				}, 500)
			}, 5000)
		}
	}, [state.message])

	return (
		<div
			className="message-banner"
			style={{
				filter: `opacity(${opacity}%)`,
				display: opacity > 0 ? 'block' : 'none'
			}}
			onClick={() => setOpacity(0)}
		>
			<p>{state.message}</p>
		</div>
	)
}
