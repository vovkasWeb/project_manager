import axios from '../../axios'
import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuth, seletctIsAuth } from '../../redux/slices/auth.js'
import { fetchRemoveProject } from '../../redux/slices/project'
import { Dispatch } from '@reduxjs/toolkit'

const MyProjects = () => {
	const dispatch = useDispatch()
	const isAuth = useSelector(seletctIsAuth)
	const [myProjects, setMyProject] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		axios.get('/myProjects').then(res => {
			setMyProject(res.data)
			setIsLoading(false)
		})
	}, [myProjects])

	const onDeleteProject = id => {
		if (window.confirm('Ви справді хочете видалити статтю?')) {
			dispatch(fetchRemoveProject(id))
				.then(() => {
					axios
						.delete(`/tasks/${id}`)
						.then(() => {
							alert('Успішно видалив')
						})
						.catch(err => {
							alert(err)
						})
				})
				.catch(err => {
					alert(err)
				})
		}
	}
	if (myProjects.length === 0) {
		return (
			<h3 className='text-center py-10'>У вас немає проектів, створіть їх</h3>
		)
	}

	if (isLoading) {
		return <div>loading</div>
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
						<th>Short description</th>
						<th>Add Task</th>
						<th>Tasks</th>
						<th>Update</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{isLoading
						? 'Loading...'
						: myProjects.map(
								({ _id, name, text, shortDescription, imageUrl }) => (
									<tr
										style={{ borderBottom: '1px solid #000', minWidth: '100%' }}
										key={_id}
									>
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
												width: '30%',
											}}
										>
											<div style={{ maxWidth: '100%' }}>{text}</div>
										</td>
										<td
											style={{
												borderRight: '1px solid #000',
												padding: '0 2px',
											}}
										>
											{shortDescription}
										</td>
										<td className='btn-castom inline-block'>
											<Link to={`/tasksAdd/${_id}`}> AddTasks</Link>
										</td>
										<td className='btn-castom inline-block'>
											<Link to={`/tasks/${_id}`}>Tasks</Link>
										</td>
										<td className='btn-castom inline-block'>
											<Link to={`/projectUpdate/${_id}`}>Update</Link>
										</td>
										<td>
											<button
												className='btn-castom inline-block'
												onClick={() => {
													onDeleteProject(_id)
												}}
											>
												Delete
											</button>
										</td>
									</tr>
								)
						  )}
				</tbody>
			</table>
		</div>
	)
}

export default MyProjects
