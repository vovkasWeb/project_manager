import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuth, seletctIsAuth } from '../../redux/slices/auth.js'
import axios from '../../axios'
import { useState } from 'react'
const AddTask = () => {
	const { id } = useParams()
	const [file, setFile] = useState(null)
	const isAuth = useSelector(seletctIsAuth)
	const navigate = useNavigate()
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
	} = useForm({ mode: 'onBlur' })

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
				const formData = new FormData()
				formData.append('image', file)
				const dataUrl = await axios.post('/upload', formData)
				console.log(dataUrl)
				if (dataUrl.status !== 200) {
					return alert('Помилка під час створення проекту')
				}
				newData.imageUrl = dataUrl.data.url
			}

			const data = await axios.post(`/task/${id}`, newData)
			if (data.status !== 200) {
				return alert('Помилка під час створення проекту')
			}
			 navigate(`/projects/${id}`)
		} catch (err) {
			console.warn(err)
			return alert('Помилка під час створення проекту')
		}
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)} id='formElem'>
			<div className='max-w-xl mx-auto px-10'>
				<div className='space-y-12 mt-4'>
					<h2 className='text-center font-black text-xl'> Create Task</h2>
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
									required: 'Поле обовязкове до заповнення',
									minLength: {
										value: 2,
										message: 'мінімум 2 символи',
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
									required: 'Поле обовязкове до заповнення',
									minLength: {
										value: 10,
										message: 'мінімум 10 символів',
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
								<span className='sr-only'>Оберіть фото профілю</span>
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
						Create
					</button>
				</div>
			</div>
		</form>
	)
}
export default AddTask
