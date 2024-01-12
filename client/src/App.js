import { Route, Routes } from 'react-router-dom'

import './App.css'
import Header from './components/Header'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Registration from './pages/Registration/Registration'

function App() {
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
