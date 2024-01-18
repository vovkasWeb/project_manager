import { useState } from 'react'
import { useParams } from 'react-router-dom'

import axios from '../../axios'
import noPhoto from './no_photo.jpg'

const FullPost = () => {
	const { id } = useParams()
	const [data, setData] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [tasks, setTasks] = useState([])
	const [isLoadingTask, setIsLoadingTask] = useState(true)
	useState(() => {
		axios.get(`/projects/${id}`).then(res => {
			setData(res.data)
			setIsLoading(false)
		})
		axios.get(`/tasks/${id}`).then(res => {
			setTasks(res.data)
			setIsLoadingTask(false)
		})
	})
	if (isLoading) {
		return <h3>Login...</h3>
	}

	return (
		<div className='flex flex-wrap'>
			<div className='flex-50 m-4'>
				<img
					className='w-full'
					src={
						data?.imageUrl ? `http://localhost:3001${data.imageUrl}` : noPhoto
					}
					alt=''
				/>
			</div>
			<div className='flex-50 m-4 px-3 py-2 rounded-2xl bg-red-100'>
				<div>
					<h2 className='text-center text-2xl font-black'>
						Інформація для проєкту
					</h2>
					<h3 className='font-bold text-2xl'>Name:</h3>
					<h2 className='text-xl'>{data.name}</h2>
					<h3 className='font-bold text-2xl'>Full info:</h3>
					<p className='text-xl'>{data.text}</p>
				</div>
				<div>
					<h2 className='text-center text-2xl font-black pt-1'>
						Todo for project
						<div className='py-1'>
							{isLoadingTask ? (
								'Loading...'
							) : tasks.length ? (
								tasks.map(task => (
									<div
										key={task._id}
										className='px-2 py-1 my-1 bg-red-500 rounded-xl flex items-center text-base w-full'
									>
										<img
											className='w-10'
											src={
												task?.imageUrl
													? `http://localhost:3001${task.imageUrl}`
													: noPhoto
											}
											alt=''
										/>
										<span className='px-2 flex items-center'>
											Name: {task.name}
										</span>
										<div className='px-2 flex items-center'>
											text: {task.text}
										</div>
									</div>
								))
							) : (
								<h3>Завдань немає</h3>
							)}
						</div>
					</h2>
				</div>
			</div>
		</div>
	)
}

export default FullPost
