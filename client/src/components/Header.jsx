import { Link } from 'react-router-dom'

const Header = () => {
	return (
		<header className='py-2 px-5 bg-amber-300 w-full flex justify-between'>
			<Link className='text-xl' to='/'>
				<h2 className='font-extrabold'>Project Manager</h2>
			</Link>
			<div>
				<Link className='btn-castom mx-1' to='/login'>
					Login
				</Link>
				<Link className='btn-castom mx-1' to='/register'>
					Registration
				</Link>
			</div>
		</header>
	)
}

export default Header
