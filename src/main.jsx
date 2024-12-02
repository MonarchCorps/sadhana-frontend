import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { ScrollTopProvider } from './context/ScrollTopProvider'
import { OnlineUsersProvider } from './context/OnlineUsersProvider'
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<OnlineUsersProvider>
						<ScrollTopProvider>
							<Routes>
								<Route path='/*' element={<App />} />
							</Routes>
						</ScrollTopProvider>
					</OnlineUsersProvider>
				</QueryClientProvider>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>,
)