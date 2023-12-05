import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AuthProvider from './Providers/AuthProvider'
import Router from './Router'
import { store } from './Store/store'

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<Provider store={store}>
				<Router />
			</Provider>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
