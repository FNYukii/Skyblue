import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './views/styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { LoadScript } from '@react-google-maps/api'

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<LoadScript googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAPS_PLATFORM_API_KEY}`}>
				<App />
			</LoadScript>
		</BrowserRouter>
	</React.StrictMode>
)