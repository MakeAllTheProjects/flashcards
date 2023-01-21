import React from 'react'

import './DialogBox.scss'

export default function DialogBox ({ 
	open,
	message,
	cancelAction,
	cancelText,
	confirmAction,
	confirmText
}) {
	return (
		<dialog
			className="dialog-box"
			open={open}
		>
			<p>{message}</p>
			<menu className="dialog-box-menu">
				<button
					className="cancel-button"
					onClick={() => cancelAction()}
				>
					{cancelText}
				</button>
				<button
					className="confirm-button"
					onClick={() => confirmAction()}
				>
					{confirmText}
				</button>
			</menu>
		</dialog>
	)
}