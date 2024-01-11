import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import router from './router/index.js'

dotenv.config()
const PORT = process.env.PORT || 3001

mongoose
	.connect(process.env.DB_CONNECT)
	.then(() => console.log('DB work'))
	.catch(err => console.log(`Error DB message: ${err}`))

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', router)

app.get('/', (req, res) => {
	res.json('test')
})

app.listen(PORT, err => {
	if (err) {
		return console.log(err)
	}
	console.log(`Server work on port: ${PORT}`)
})
