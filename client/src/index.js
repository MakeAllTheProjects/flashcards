import { CookiesProvider } from 'react-cookie'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

ReactDOM.render(
	<CookiesProvider>
		<App/>
	</CookiesProvider>,	
	document.getElementById('root')
)