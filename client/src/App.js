import { Route, Routes } from 'react-router-dom'

import './App.css'
import Header from './components/Header'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Registration from './pages/Registration/Registration'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sheckAuth } from './redux/slices/auth'
function App() {
	const dispatch = useDispatch()
	useEffect(() => {
		const token = window.localStorage.getItem('token')
		if (token) {
			dispatch(sheckAuth({ token }))
		}
	}, [])

	return (
		<>
			<div className='container mx-auto'>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Registration />} />
				</Routes>
			</div>
		</>
	)
}

export default App
