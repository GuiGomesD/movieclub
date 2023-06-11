import React from 'react'
import Header from './components/Header'
import Home from './Home'
import Default from './pages/Default'
import About from './pages/About'
import Me from './pages/Me'
import Error404 from './pages/Error404'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './css/tailwind.css'
import './css/App.css'

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/me" element={<Me />} />
				<Route path="/about" element={<About />} />
				<Route path="/default" element={<Default />} />
				<Route path="*" element={<Error404 />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
