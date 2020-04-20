import React from 'react'
import ReactDOM from 'react-dom'
import { CookiesProvider } from 'react-cookie'

import App from './App'
import { UserProvider } from './utils/context/user-context'

ReactDOM.render(
  <CookiesProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </CookiesProvider>,
  document.getElementById('root')
)
