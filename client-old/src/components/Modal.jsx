import React from 'react'

import './Modal.scss'

export default function Modal ({children, display, setDisplay}) {
	return (
		<div
			className="modal"
			style={{ display: display ? "block" : "none"}}
			onClick={() => setDisplay(!display)}
		>
			{children}
		</div>
	)
}
