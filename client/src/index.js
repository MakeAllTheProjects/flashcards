import React from 'react'
import ReactDOM from 'react-dom'
import { CookiesProvider } from 'react-cookie'

import App from './App'
import { AuthProvider } from './utils/context/auth-context'

ReactDOM.render(
  <CookiesProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </CookiesProvider>,
  document.getElementById('root')
)
