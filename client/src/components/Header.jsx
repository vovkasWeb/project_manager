import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, seletctIsAuth } from '../redux/slices/auth'

const Header = () => {
	const dispatch = useDispatch()
	const isAuth = useSelector(seletctIsAuth)
	const onClickLogout = () => {
		if (window.confirm('Вы дествительно хотите выйти с акаунта ?')) {
			dispatch(logout())
			window.localStorage.removeItem('token')
		}
	}
	return (
		<header className='py-2 px-5 bg-amber-300 w-full flex justify-between'>
			<Link className='text-xl' to='/'>
				<h2 className='font-extrabold'>Project Manager</h2>
			</Link>
			<div>
				{isAuth ? (
					<>
						<Link className='btn-castom mx-1' to='/myProjects'>
							Мій проекти
						</Link>
						<Link className='btn-castom mx-1' to='/addPost'>
							Написати статтю
						</Link>
						<button
							className='btn-castom mx-1'
							onClick={onClickLogout}
							variant='contained'
							color='error'
						>
							Вийти
						</button>
					</>
				) : (
					<>
						<Link className='btn-castom mx-1' to='/login'>
							Вхід
						</Link>
						<Link className='btn-castom mx-1' to='/register'>
							Реєстрація
						</Link>
					</>
				)}
			</div>
		</header>
	)
}

export default Header
