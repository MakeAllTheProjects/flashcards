import {
  useMemo,
} from "react"

import "./AttemptDetails.scss"

export const AttemptDetails = ({
  viewCardDetails,
  recentAttempts,
}) => {
  const attemptPercentage = useMemo(
    () => Math.round((recentAttempts.filter((attempt) => attempt.success).length / recentAttempts.length) * 100),
    [recentAttempts]
  )

  return (
    <section 
      className="card-attempts"
      style={{ 
        opacity: viewCardDetails ? "100%" : "0%" 
      }}
    >
      <p className="attempt-info">
        {recentAttempts.length === 0 
          ? 'No attempts made' 
          : `${attemptPercentage}%`
        }
      </p>

      <div className="attempt-bar">
				{recentAttempts.map(attempt => (
          <span 
            key={attempt.id} 
            className="attempt-block" 
            style={{ 
              backgroundColor: attempt.success ? "green" : "red" 
            }} 
          />
        ))}
			</div>
    </section>
  )
}
