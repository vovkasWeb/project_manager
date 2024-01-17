const Filter = () => {
	return (
		<div className='flex w-full py-2 px-5 bg-orange-500 justify-between'>
			<div>
				<button
					className='btn-castom mx-1 bg-yellow-800 '
					// onClick={onClickLogout}
				>
					All Project
				</button>
				<button
					className='btn-castom mx-1 bg-yellow-800 '
					// onClick={onClickLogout}
				>
					Have image
				</button>
			</div>
			<div>
				<label className='relative block'>
					<span className='sr-only'>Search</span>
					<span className='absolute inset-y-0 left-0 flex items-center pl-2'>
						<svg
							className='h-5 w-5 fill-slate-300'
							enableBackground='new 0 0 32 32'
							id='Glyph'
							version='1.1'
							viewBox='0 0 32 32'
						>
							<path
								d='M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z'
								id='XMLID_223_'
							/>
						</svg>
					</span>
					<input
						className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
						placeholder='Search for anything...'
						type='text'
						name='search'
					/>
				</label>
			</div>
		</div>
	)
}

export default Filter
