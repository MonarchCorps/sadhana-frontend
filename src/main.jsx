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
import { SidebarProvider } from './components/ui/sidebar.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<SidebarProvider>
					<QueryClientProvider client={queryClient}>
						<OnlineUsersProvider>
							<ScrollTopProvider>
								<Routes>
									<Route path='/*' element={<App />} />
								</Routes>
							</ScrollTopProvider>
						</OnlineUsersProvider>
					</QueryClientProvider>
				</SidebarProvider>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>,
)