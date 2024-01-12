import { useState } from 'react'
import { Link, Navigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAuth, seletctIsAuth } from '../../redux/slices/auth.js'

const Login = () => {
	const isAuth = useSelector(seletctIsAuth)
	const dispatch = useDispatch()
	const {
		register,
		formState: { errors,isValid},
		handleSubmit,
		reset,
	} = useForm({mode:'onBlur'})

	if (isAuth) {
		return <Navigate to='/' />
	}
	const onSubmit = async values => {
		const data = await dispatch(fetchAuth(values))
		if (!data.payload) {
			return alert('Не удалось авторизоваться')
		}
		if ('token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token)
			reset()
		}
	}

	if (isAuth) {
		<Navigate to='/' />
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='max-w-xl mx-auto px-10'>
				<div className='space-y-12 mt-4'>
					<div className='border-b border-gray-900/10 pb-8 '>
						<div className='col-span-full pt-1'>
							<label
								htmlFor='email'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Email address
							</label>
							<input
								{...register('email', {
									required: 'Поле обезательно к заполнению',
									minLength: {
										value: 5,
										message: 'минимум 5 символов.',
									},
								})}
								id='email'
								name='email'
								type='email'
								autoComplete='email'
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2 px-2'
							/>
							<div>
								{errors?.email && (
									<p className='text-red-700'>
										{errors?.email?.message || 'Error'}
									</p>
								)}
							</div>
						</div>
						<div className='col-span-full pt-1'>
							<label
								htmlFor='password'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Password
							</label>
							<input
								{...register('password', {
									required: 'Поле обезательно к заполнению',
									minLength: {
										value: 5,
										message: 'минимум 5 символов.',
									},
								})}
								type='text'
								name='password'
								id='password'
								autoComplete='password'
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2 px-2'
							/>
							<div>
								{errors?.password && (
									<p className='text-red-700'>
										{errors?.password?.message || 'Error'}
									</p>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className='mt-6 flex items-center justify-end gap-x-2'>
					<Link
						to='/'
						className='text-sm font-semibold leading-6 text-gray-900 py-1 px-2 rounded-md hover:bg-red-500'
					>
						Cancel
					</Link>
					<button
						disabled={!isValid}
						type='submit'
						className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300'
					>
						Login
					</button>
				</div>
			</div>
		</form>
	)
}

export default Login
