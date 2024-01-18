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


/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Реєстрація для користувача
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { email: "user@example.com", fullName: "John Doe", password: "12345" }
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { _id: "65a9093e1c8e6b6ed78624b3", email: "000test@gmail.com", fullName: "John Doe", createdAt : "2024-01-18T11:19:26.910Z", updatedAt: "2024-01-18T11:19:26.910Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWE5MDkzZTFjOGU2YjZlZDc4NjI0YjMiLCJpYXQiOjE3MDU1NzY3NjYsImV4cCI6MTcwODE2ODc2Nn0.EURXb60XwJn5Bc-ej2YYXuxuDoyOhiLXYNo7o7VIVr0"}
 * 
 * /api/login:
 *   post:
 *     summary: Авторизація для користувача
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { email: "000test@gmail.com", password: "12345" }
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { _id: "65a9093e1c8e6b6ed78624b3", email: "000test@gmail.com", fullName: "John Doe", createdAt : "2024-01-18T11:19:26.910Z", updatedAt: "2024-01-18T11:19:26.910Z", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWE5MDkzZTFjOGU2YjZlZDc4NjI0YjMiLCJpYXQiOjE3MDU1NzY3NjYsImV4cCI6MTcwODE2ODc2Nn0.EURXb60XwJn5Bc-ej2YYXuxuDoyOhiLXYNo7o7VIVr0"}
 * 
 * 
 * /api/projects:
 *   get:
 *     summary: Отримання всіх проєктів
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{ "_id": "65a6a404bf39db29ab8ff540","name": "hjk", "shortDescription": "hgkjhgkjhghgf", "text": "gjhgkjgkhh", "imageUrl": "/uploads/photo_2024-01-09_20-24-56.jpg", "createdAt": "2024-01-16T15:43:00.140Z", "updatedAt": "2024-01-16T15:43:00.140Z",  "user": { "_id": "65a047c60d34ab3f1e18bd3a", "fullName": "Slavik Pesto" }}]
 *   post:
 *     summary: Створення проекту
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { email: "000test@gmail.com", password: "12345" }
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { "_id": "65a6a404bf39db29ab8ff540","name": "hjk", "shortDescription": "hgkjhgkjhghgf", "text": "gjhgkjgkhh", "imageUrl": "/uploads/photo_2024-01-09_20-24-56.jpg", "createdAt": "2024-01-16T15:43:00.140Z", "updatedAt": "2024-01-16T15:43:00.140Z", "user": "65a047c60d34ab3f1e18bd3a"}
 * 
 * 
 * /api/projects/{id}:
 *   get:
 *     summary: Отримання одного проєкту
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { "_id": "65a6a404bf39db29ab8ff540","name": "hjk", "shortDescription": "hgkjhgkjhghgf", "text": "gjhgkjgkhh", "imageUrl": "/uploads/photo_2024-01-09_20-24-56.jpg", "createdAt": "2024-01-16T15:43:00.140Z", "updatedAt": "2024-01-16T15:43:00.140Z",  "user": { "_id": "65a047c60d34ab3f1e18bd3a", "fullName": "Slavik Pesto" }}
 * 
 * /api/projects/{id}/:
 *   patch:
 *     summary: Оновлення проекту
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { email: "000test@gmail.com", password: "12345" }
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { "_id": "65a6a404bf39db29ab8ff540","name": "hjk", "shortDescription": "hgkjhgkjhghgf", "text": "gjhgkjgkhh", "imageUrl": "/uploads/photo_2024-01-09_20-24-56.jpg", "createdAt": "2024-01-16T15:43:00.140Z", "updatedAt": "2024-01-16T15:43:00.140Z", "user": "65a047c60d34ab3f1e18bd3a"}
 * 
 * /api/myProjects:
 *   get:
 *     summary: Отримання всіх проєктів авторизованого користувача
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{ "_id": "65a6a404bf39db29ab8ff540","name": "hjk", "shortDescription": "hgkjhgkjhghgf", "text": "gjhgkjgkhh", "imageUrl": "/uploads/photo_2024-01-09_20-24-56.jpg", "createdAt": "2024-01-16T15:43:00.140Z", "updatedAt": "2024-01-16T15:43:00.140Z",  "user": { "_id": "65a047c60d34ab3f1e18bd3a", "fullName": "Slavik Pesto" }}]
 * 
 * /api/tasks/{id}:
 *   get:
 *     summary: Отримання всіх завдань
 *     tags: [Task]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"_id": "65a677c9efd12d4a80afcd0b", "name": "Вторая таска", "text": "ффффффффффффффффффф", "project": "65a583df621f13fd18b1f389", "createdAt": "2024-01-16T12:34:17.833Z", "updatedAt": "2024-01-16T12:34:17.833Z"},]
 *   delete:
 *     summary: Видалення задниці
 *     tags: [Task]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"_id": "65a677c9efd12d4a80afcd0b", "name": "Вторая таска", "text": "ффффффффффффффффффф", "project": "65a583df621f13fd18b1f389", "createdAt": "2024-01-16T12:34:17.833Z", "updatedAt": "2024-01-16T12:34:17.833Z"},]
 * 
 * 
 * /api/task/{id}:
 *   get:
 *     summary: Отримання одного завдання
 *     tags: [Task]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"_id": "65a677c9efd12d4a80afcd0b", "name": "Вторая таска", "text": "ффффффффффффффффффф", "project": "65a583df621f13fd18b1f389", "createdAt": "2024-01-16T12:34:17.833Z", "updatedAt": "2024-01-16T12:34:17.833Z"},]
 *   post:
 *     summary: Створення завдання
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { name: "Перва", task: "1111111111111111111", imageUrl: "/uploads/photo_2024-01-09_20-24-56.jpg" }
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { "_id": "65a6a404bf39db29ab8ff540","name": "hjk", "text": "gjhgkjgkhh", "imageUrl": "/uploads/photo_2024-01-09_20-24-56.jpg", "createdAt": "2024-01-16T15:43:00.140Z", "updatedAt": "2024-01-16T15:43:00.140Z", "project": "65a047c60d34ab3f1e18bd3a"}
 *   patch:
 *     summary: Оновлення завдання
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { name: "Перва", task: "1111111111111111111", imageUrl: "/uploads/photo_2024-01-09_20-24-56.jpg" }
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { "_id": "65a6a404bf39db29ab8ff540","name": "hjk", "text": "gjhgkjgkhh", "imageUrl": "/uploads/photo_2024-01-09_20-24-56.jpg", "createdAt": "2024-01-16T15:43:00.140Z", "updatedAt": "2024-01-16T15:43:00.140Z", "project": "65a047c60d34ab3f1e18bd3a"}
 * 
 * 
 * /api/upload:
 *   post:
 *     summary: Збереження картинки на сервері
 *     tags: [Img]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {img: {}}
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {url: "/uploads/updated_image.jpg" }
 * 
 * /api/upload/{:id}:
 *   delete:
 *     summary: Видалення картинки із сервера
 *     tags: [Img]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {url: "/uploads/updated_image.jpg" }
 */



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


router.get('/tasks/:id', ProjectController.getAllTask)
router.delete('/tasks/:id', checkAuth, ProjectController.deleteManyTask)

router.post('/task/:id', checkAuth, ProjectController.createTask)
router.get('/task/:id', checkAuth, ProjectController.getOneTask)
router.delete('/task/:id', checkAuth, ProjectController.deleteTask)
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
