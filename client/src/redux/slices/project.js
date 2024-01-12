import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchProject = createAsyncThunk(
	'project/fetchProject',
	async () => {
		const { data } = await axios.get('/projects')
		return data
	}
)

const initialState = {
	projects: {
		items: [],
		status: 'loading',
	},
}

const projectSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchProject.pending, state => {
			state.projects.items = []
			state.projects.status = 'loading'
		})
		builder.addCase(fetchProject.fulfilled, (state, action) => {
			state.projects.items = action.payload
			state.projects.status = 'loaded'
		})
		builder.addCase(fetchProject.rejected, state => {
			state.projects.items = []
			state.projects.status = 'error'
		})
	},
})

export const projectReducer = projectSlice.reducer
