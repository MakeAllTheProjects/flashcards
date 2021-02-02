import React from 'react'

import './AttemptDetails.scss'

export default function AttemptDetails ({viewCardDetails, recentAttempts}) {
	return (
		<div className="card-attempts" style={{ opacity: viewCardDetails ? "100%" : "0%" }}>
			<p className="attempt-info">{recentAttempts.length === 0 ? 'No attempts made' : `${Math.round((recentAttempts.filter(function (attempt) { return attempt.success }).length / recentAttempts.length) * 100)}%`}</p>
			<div className="attempt-bar">
				{recentAttempts.map(attempt => <span key={attempt.id} className="attempt-block" style={{ backgroundColor: attempt.success ? "green" : "red"}} />)}
			</div>
		</div>
	)
}