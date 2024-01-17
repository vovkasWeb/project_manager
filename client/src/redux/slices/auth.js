import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchAuth = createAsyncThunk('/fetchUserData', async params => {
	const { data } = await axios.post('/login', params)
	return data
})

export const fetchRegister = createAsyncThunk(
	'/fetchRegister',
	async params => {
		const { data } = await axios.post('/register', params)
		return data
	}
)

export const fetchAuthMe = createAsyncThunk('/fetchUserMe', async () => {
	const { data } = await axios.get('/auth/me')
	return data
})

const initialState = {
	data: null,
	status: 'loading',
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: state => {
			state.data = null
		},
		sheckAuth: (state, value) => {
			state.data = value
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchAuth.pending, state => {
			state.status = 'loading'
			state.data = null
		})
		builder.addCase(fetchAuth.fulfilled, (state, action) => {
			state.status = 'loaded'
			state.data = action.payload
		})
		builder.addCase(fetchAuth.rejected, state => {
			state.status = 'error'
			state.data = null
		})
		builder.addCase(fetchRegister.pending, state => {
			state.status = 'loading'
			state.data = null
		})
		builder.addCase(fetchRegister.fulfilled, (state, action) => {
			state.status = 'loaded'
			state.data = action.payload
		})
		builder.addCase(fetchRegister.rejected, state => {
			state.status = 'error'
			state.data = null
		})
		builder.addCase(fetchAuthMe.pending, state => {
			state.status = 'loading'
			state.data = null
		})
		builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
			state.status = 'loaded'
			state.data = action.payload
		})
		builder.addCase(fetchAuthMe.rejected, state => {
			state.status = 'error'
			state.data = null
		})
	},
})

export const seletctIsAuth = state => Boolean(state.auth.data)
export const authReducer = authSlice.reducer

export const { logout, sheckAuth } = authSlice.actions
