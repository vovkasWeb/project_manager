
import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import axios from '../../axios'
import { fetchAuth, seletctIsAuth } from '../../redux/slices/auth.js'
import { fetchRemoveProject } from '../../redux/slices/project'

const Task = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const isAuth = useSelector(seletctIsAuth)
	const [tasks, setTasks] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		axios.get(`/tasks/${id}`).then(res => {
			setTasks(res.data)
			setIsLoading(false)
		})
	}, [tasks])

	const onDeleteProject = id => {
		if (window.confirm('Вы дествительно хотите удалить Таск  ?')) {
        axios.delete(`/task/${id}`)
				.then(() => {
					alert('Успешно удалил')
				})
				.catch(err => {
					alert(err)
				})
		}
	}

	if (isLoading) {
		return <div>loading</div>
	}
    if (tasks.length ===0) {
        	return <h3 className='text-center py-10'>Задач нету для этого проекта</h3>
    }
	if (!isAuth) {
		return <Navigate to='/' />
	}
	return (
		<div className='w-full'>
			<table className='table-auto w-full'>
				<thead style={{ borderBottom: '1px solid #000' }}>
					<tr>
						<th>Img have</th>
						<th>Name</th>
						<th>Text</th>
						<th>Update</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{isLoading
						? 'Loading...'
						: tasks.map(({ _id, name, text, imageUrl }) => (
								<tr style={{ borderBottom: '1px solid #000' }} key={_id}>
									<td
										style={{
											borderRight: '1px solid #000',
											padding: '0 2px',
										}}
									>
										{imageUrl ? 'Yes' : 'No'}
									</td>
									<td
										style={{
											borderRight: '1px solid #000',
											padding: '0 2px',
										}}
									>
										{name}
									</td>
									<td
										style={{
											borderRight: '1px solid #000',
											padding: '0 2px',
										}}
									>
										{text}
									</td>
									<th className='btn-castom inline-block'>
										<Link to={`/tasksUpdate/${_id}`}>Update</Link>
									</th>
									<th>
										<button
											className='btn-castom inline-block'
											onClick={() => {
												onDeleteProject(_id)
											}}
										>
											Delete
										</button>
									</th>
								</tr>
						  ))}
				</tbody>
			</table>
		</div>
	)
}

export default Task
