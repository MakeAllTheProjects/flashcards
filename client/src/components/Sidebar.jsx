import React from 'react'

import './Sidebar.scss'

export default function Sidebar ({sidebarButtons}) {
	return (
		<aside className="sidebar">
			{sidebarButtons.length > 0 && sidebarButtons.map(button => (
				<img
					key={button.name.split(" ").join("")}
					className="sidebar-button"
					alt={button.name}
					title={button.name}
					src={button.icon}
					onClick={() => button.action()}
				/>
			))}
		</aside>
	)
}