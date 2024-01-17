import { Router } from 'express'
import multer from 'multer'
import { ProjectController, UserController } from '../controllers/index.js'
import { checkAuth, handleValidationErrors } from '../utils/index.js'
import {
	registerValidation,
	loginValidation,
	ProjectCreateValidation,
} from '../validations/index.js'

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads')
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname)
	},
})

const upload = multer({ storage })

const router = new Router()

//get all
router.get('/projects', ProjectController.getAll)

router.get('/myProjects', checkAuth, ProjectController.getMyAll)
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

router.post(
	'/upload',
	checkAuth,
	upload.single('image'),
	ProjectController.uploading
)

router.delete('/upload/:nameFile', checkAuth, ProjectController.removeUplode)

router.post('/task/:id', checkAuth, ProjectController.createTask)
router.get('/tasks/:id', checkAuth, ProjectController.getAllTask)
router.get('/task/:id', checkAuth, ProjectController.getOneTask)
router.delete('/task/:id', checkAuth, ProjectController.deleteTask)
router.delete('/tasks/:id',checkAuth,ProjectController.deleteManyTask)
router.patch('/task/:id', checkAuth, ProjectController.updateTask)
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
router.get('/auth/me', checkAuth, UserController.getMe)

export default router
