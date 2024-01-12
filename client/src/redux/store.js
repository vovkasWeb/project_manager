import { configureStore } from '@reduxjs/toolkit'
import { projectReducer } from './slices/project'
import { authReducer } from './slices/auth'

const store = configureStore({
	reducer: {
		projects: projectReducer,
		auth: authReducer,
	},
})

export default store
