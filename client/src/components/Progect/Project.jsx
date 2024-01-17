import noPhoto from './no_photo.jpg'
const Project = ({ name, shortDescription, imageUrl, _id }) => {
	return (
		<div className='flex-50 m-2'>
			<div className='md:flex max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
				<div className='md:shrink-0'>
					<img
						className='h-48 w-full object-cover md:h-full md:w-48'
						src={imageUrl ? `http://localhost:3001${imageUrl}` : noPhoto}
					/>
				</div>
				<div className='p-8'>
					<div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>
						{name}
					</div>
					<p className='mt-2 mb-1 text-slate-500'>{shortDescription}</p>
					<a
						className='btn-castom mx-2 bg-red-600 hover:bg-red-900 ml-auto'
						href={`projects/${_id}`}
					>
						Read full
					</a>
				</div>
			</div>
		</div>
	)
}
export default Project
