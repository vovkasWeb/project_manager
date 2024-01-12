import { useEffect } from 'react'
import Filter from '../../components/Filter'
import Project from '../../components/Project'
import axios from '../../axios'
import { useDispatch } from 'react-redux'
import { fetchProject } from '../../redux/slices.js/project'


const Home = () => {
    const dispatch = useDispatch()
	useEffect(() => {
	dispatch(fetchProject())
	}, [])
	return (
		<div className=''>
			<Filter />
			<div className='flex flex-wrap py-2 justify-between'>
				
			</div>
		</div>
	)
}
export default Home
