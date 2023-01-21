import React, { useState } from 'react'

import './ForgottenPasswordForm.scss'

export default function ForgottenPasswordForm() {
  const [email, setEmail] = useState('')
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSendRecoveryEmail = (e) => {
    e.preventDefault()

    setIsSending(true)

    setTimeout(() => {
      setIsSending(false)
      setIsSent(true)
    }, 3000)
  }

  return (
    <form
      className="forgotten-password"
      onSubmit={e => handleSendRecoveryEmail(e)}
    >
      <p>Enter the email associated with your account to reset your password.</p>

      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="email@email.com"
        required
      />

      <input
        className={!isSending && !isSent ? "send-button" : "send-button disabled"}
        type="submit"
        value="Send"
        disabled={isSending || isSent}
      />

      {showError && <p className="error-message">{errorMessage}</p>}

      {isSending && <p className="status-message">Sending recovery email...</p>}
      {isSent && <p className="status-message">Recovery email sent.</p>}
    </form>
  )
}
