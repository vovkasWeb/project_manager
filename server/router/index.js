import { Router } from 'express'

import { ProjectController, UserController } from '../controllers/index.js'
import { checkAuth, handleValidationErrors } from '../utils/index.js'
import {
	registerValidation,
	loginValidation,
	ProjectCreateValidation,
} from '../validations/index.js'

const router = new Router()

//get all
router.get('/projects', ProjectController.getAll)
//get one
router.get('/projects/:id', ProjectController.getOne)
//create
router.post(
	'/projects',
	checkAuth,
	ProjectCreateValidation,
	handleValidationErrors,
	ProjectController.create
)
///update
router.patch(
	'/projects/:id',
	checkAuth,
	ProjectCreateValidation,
	handleValidationErrors,
	ProjectController.update
)
//delete
router.delete('/projects/:id', checkAuth, ProjectController.remove)

//User
router.post(
	'/login',
	loginValidation,
	handleValidationErrors,
	UserController.login
)
router.post(
	'/register',
	registerValidation,
	handleValidationErrors,
	UserController.register
)

export default router
