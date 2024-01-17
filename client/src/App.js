import { Route, Routes } from 'react-router-dom'

import './App.css'

import Header from './components/Header'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Registration from './pages/Registration/Registration'
import AddPost from './pages/AddPost/AddPost'
import FullPost from './pages/FullPost/FullPost'
import MyProjects from './pages/MyPorojects/MyPorojects'
import ProjectUpdate from './pages/ProjectUpdate/ProjectUpdate'
import AddTask from './pages/AddTask/AddTask'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sheckAuth, fetchAuthMe } from './redux/slices/auth'
import Tasks from './pages/Tasks/Tasks'
import UpdateTask from './pages/UpdateTask/UpdateTask'

function App() {
	const dispatch = useDispatch()
	useEffect(() => {
		const token = window.localStorage.getItem('token')
		if (token) {
			dispatch(sheckAuth({ token }))
			dispatch(fetchAuthMe())
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
					<Route path='/addPost' element={<AddPost />} />
					<Route path='/projects/:id' element={<FullPost />} />
					<Route path='/myProjects' element={<MyProjects />} />
					<Route path='/projectUpdate/:id' element={<ProjectUpdate />} />
					<Route path='/tasks/:id' element={<Tasks />} />
					<Route path='/tasksAdd/:id' element={<AddTask />} />
					<Route path='/tasksUpdate/:id' element={<UpdateTask />} />
				</Routes>
			</div>
		</>
	)
}

export default App
