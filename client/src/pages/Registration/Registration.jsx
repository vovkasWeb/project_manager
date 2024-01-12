const Registration = () => {
	return (
		<form>
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
								id='email'
								name='email'
								type='email'
								autoComplete='email'
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2 px-2'
							/>
						</div>
						<div className='col-span-full pt-1'>
							<label
								htmlFor='password'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Password
							</label>
							<input
								type='text'
								name='password'
								id='password'
								autoComplete='password'
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2 px-2'
							/>
						</div>
						<div className='col-span-full pt-1'>
							<label
								htmlFor='fullName'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								fullName
							</label>
							<input
								id='fullName'
								name='fullName'
								type='fullName'
								autoComplete='fullName'
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2 px-2'
							/>
						</div>
					</div>
				</div>

				<div className='mt-6 flex items-center justify-end gap-x-6'>
					<button
						type='button'
						className='text-sm font-semibold leading-6 text-gray-900'
					>
						Cancel
					</button>
					<button
						type='submit'
						className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Register
					</button>
				</div>
			</div>
		</form>
	)
}

export default Registration
