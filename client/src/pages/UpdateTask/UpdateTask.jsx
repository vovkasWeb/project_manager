import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { seletctIsAuth } from '../../redux/slices/auth.js'
import axios from '../../axios'
import { useEffect, useState } from 'react'
const UpdateTask = () => {
	const { id } = useParams()
	const [file, setFile] = useState(null)
	const [dataOnServer, setDataOnServer] = useState({})
	const isAuth = useSelector(seletctIsAuth)
	const [isLoading, setIsLoading] = useState(true)
	const navigate = useNavigate()
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
	} = useForm({
		mode: 'onBlur',
	})
	useEffect(() => {
		axios
			.get(`/task/${id}`)
			.then(({ data }) => {
				setDataOnServer(data)
				setIsLoading(false)
				reset(data)
			})
			.catch(err => {
				console.warn(err)
				alert('Ошибка при полученни Project')
			})
	}, [])

	if (isLoading) {
		return <h3>Login...</h3>
	}

	if (!isAuth) {
		return <Navigate to='/' />
	}
	const handleChange = event => {
		setFile(event.target.files[0])
	}
	const onSubmit = async values => {
		try {
			const newData = {
				...values,
			}
			if (file) {
				if (dataOnServer.imageUrl) {
					const dataUrl = await axios
						.delete(`/upload/${dataOnServer.imageUrl.replace('/uploads/', '')}`)
						.catch(err => {
							return alert('Ошибка при создание проекта')
						})
					console.log('Удалил', dataUrl)
				}
				const formData = new FormData()
				formData.append('image', file)
				const dataUrl = await axios.post('/upload', formData).catch(err => {
					return alert('Ошибка при создание проекта')
				})

				newData.imageUrl = dataUrl.data.url
				console.log(newData)
			}

			const data = await axios
				.patch(`/task/${id}`, newData)
				.then(() => {
					alert('Project update')
				})
				.catch(err => {
					return alert('Ошибка при создание проекта--')
				})
			console.log(data)
			navigate(`/myProjects`)
		} catch (err) {
			console.warn(err)
			return alert('Ошибка при создание проекта 0')
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} id='formElem'>
			<div className='max-w-xl mx-auto px-10'>
				<div className='space-y-12 mt-4'>
					<h2 className='text-center font-black text-xl'> Update Task</h2>
					<div className='border-b border-gray-900/10 pb-8 '>
						<div className='col-span-full pt-1'>
							<label
								htmlFor='name'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Name
							</label>
							<input
								{...register('name', {
									required: 'Поле обезательно к заполнению',
									minLength: {
										value: 2,
										message: 'минимум 2 символов.',
									},
								})}
								id='name'
								name='name'
								type='name'
								autoComplete='name'
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2 px-2'
							/>
							<div>
								{errors?.name && (
									<p className='text-red-700'>
										{errors?.name?.message || 'Error'}
									</p>
								)}
							</div>
						</div>
						<div className='col-span-full pt-1'>
							<label
								htmlFor='text'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Text
							</label>
							<input
								{...register('text', {
									required: 'Поле обезательно к заполнению',
									minLength: {
										value: 10,
										message: 'минимум 10 символов.',
									},
								})}
								type='text'
								name='text'
								id='text'
								autoComplete='text'
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2 px-2'
							/>
							<div>
								{errors?.text && (
									<p className='text-red-700'>
										{errors?.text?.message || 'Error'}
									</p>
								)}
							</div>
						</div>
						<div className='col-span-full pt-3'>
							<label
								htmlFor='text'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Image
							</label>
							<label className='block pt-2'>
								<span className='sr-only'>Choose profile photo</span>
								<input
									type='file'
									name='image'
									id='image'
									autoComplete='image'
									accept='image/*,.png,.jpg,.web'
									onChange={handleChange}
									className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100'
								/>
							</label>
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
						Update
					</button>
				</div>
			</div>
		</form>
	)
}
export default UpdateTask
