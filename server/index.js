import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import multer from 'multer'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import router from './router/index.js'

dotenv.config()
const PORT = process.env.PORT || 3001

mongoose
	.connect(process.env.DB_CONNECT)
	.then(() => console.log('DB work'))
	.catch(err => console.log(`Error DB message: ${err}`))

const app = express()

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Your API Title',
			version: '1.0.0',
			description: 'Your API Description',
		},
		servers: [
			{
				url: `http://localhost:${PORT}`,
			},
		],
	},
	apis: ['./router/index.js', './controllers/*.js'],
}
const swaggerSpec = swaggerJSDoc(options)

app.use(express.json())
app.use(cors())
app.use('/api', router)
app.use('/uploads', express.static('uploads'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


app.listen(PORT, err => {
	if (err) {
		return console.log(err)
	}
	console.log(`Server work on port: ${PORT}`)
})
