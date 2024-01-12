import { useEffect } from 'react'
import Filter from '../../components/Filter'
import Project from '../../components/Progect/Project'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProject } from '../../redux/slices/project'

const Home = () => {
	const dispatch = useDispatch()
	const { projects } = useSelector(state => state.projects)
	const isProjectLoading = projects.status === 'loading'
	useEffect(() => {
		dispatch(fetchProject())
	}, [])
	return (
		<div className=''>
			<Filter />
			<div className='flex flex-wrap py-2 justify-between'>
				{isProjectLoading
					? 'Loading..'
					: projects.items.map(item => <Project key={item._id} {...item} />)}
			</div>
		</div>
	)
}
export default Home
