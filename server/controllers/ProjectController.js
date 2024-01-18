import ProjectModel from '../models/Project.js'
import deletePasswordHash from '../utils/deletePasswordHash.js'
import TaskModel from '../models/Task.js'
import fs from 'fs'

export const getAll = async (req, res) => {
	try {
		const projects = await ProjectModel.find().populate('user').exec()
		const newData = projects.map(item => deletePasswordHash(item))
		res.json(newData.reverse())
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не вдалося отримати проєкти',
		})
	}
}

export const getOne = async (req, res) => {
	try {
		const projectId = req.params.id
		const project = await ProjectModel.findById(projectId)
			.populate('user')
			.exec()
		const newProject = deletePasswordHash(project)

		res.json(newProject)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Проект не знайдено',
		})
	}
}
export const getMyAll = async (req, res) => {
	try {
		const projects = await ProjectModel.find({ user: req.userId })
		if (projects == []) {
			return res.json({ message: 'Порожній список' })
		}
		res.json(projects.reverse())
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не вдалося отримати проєкти',
		})
	}
}

export const uploading = async (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	})
}

export const removeUplode = (req, res) => {
	try {
		const nameFile = req.params.nameFile
		fs.unlink(`uploads/${nameFile}`, err => {
			if (err) {
				return res.status(404).json({ message: 'Image not found' })
			}
			res.status(200).json({ message: 'Image deleted successfully' })
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не вдалося видалити картинку',
		})
	}
}

export const create = async (req, res) => {
	try {
		const newData = {
			name: req.body.name,
			shortDescription: req.body.shortDescription,
			text: req.body.text,
			imageUrl: req.body.imageUrl,
			user: req.userId,
		}
		const doc = new ProjectModel(newData)
		const projects = await doc.save()
		res.json(projects)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не вдалося створити project',
		})
	}
}
export const createTask = async (req, res) => {
	try {
		const projectId = req.params.id
		console.log(projectId)
		const newData = {
			name: req.body.name,
			text: req.body.text,
			imageUrl: req.body.imageUrl,
			project: projectId,
		}
		console.log(newData)
		const doc = new TaskModel(newData)
		const projects = await doc.save()
		res.json(projects)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не вдалося створити завдання',
		})
	}
}
export const getAllTask = async (req, res) => {
	try {
		const projectId = req.params.id
		const project = await TaskModel.find({ project: projectId })
		res.json(project)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Task не знайдено',
		})
	}
}
export const getOneTask = async (req, res) => {
	try {
		const TaskId = req.params.id
		const task = await TaskModel.findById(TaskId)
		res.json(task)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Проект не знайдено',
		})
	}
}

export const deleteTask = async (req, res) => {
	try {
		const TaskId = req.params.id
		await TaskModel.deleteOne({ _id: TaskId })
		res.json({
			success: true,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не вдалося видалити',
		})
	}
}
export const deleteManyTask = async (req, res) => {
	try {
		const TaskId = req.params.id
		await TaskModel.deleteMany({ project: TaskId })
		res.json({
			success: true,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не вдалося видалити',
		})
	}
}

export const updateTask = async (req, res) => {
	try {
		const taskId = req.params.id
		await TaskModel.updateOne(
			{
				_id: taskId,
			},
			{
				name: req.body.name,
				text: req.body.text,
				imageUrl: req.body.imageUrl,
			}
		)
			.then(() => {
				res.json({
					success: true,
				})
			})
			.catch(err => {
				res.status(500).json({
					message: err,
				})
			})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Оновити не вдалося',
		})
	}
}

export const update = async (req, res) => {
	try {
		const projectId = req.params.id
		const project = await ProjectModel.findById(projectId)
		if (project.user == req.userId) {
			await ProjectModel.updateOne(
				{
					_id: projectId,
					user: req.userId,
				},
				{
					name: req.body.name,
					shortDescription: req.body.shortDescription,
					text: req.body.text,
					imageUrl: req.body.imageUrl,
					user: req.userId,
				}
			)

			res.json({
				success: true,
			})
		} else {
			res.status(500).json({
				message: 'Відмовлено в доступі, це не ваша стаття',
			})
		}
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Оновити не вдалося',
		})
	}
}
export const remove = async (req, res) => {
	try {
		const projectId = req.params.id
		const project = await ProjectModel.findById(projectId)
		if (project.user == req.userId) {
			ProjectModel.findOneAndDelete({ _id: projectId, user: req.userId }).then(
				doc => {
					if (!doc) {
						return res.status(404).json({
							message: 'Не удалось удалить',
						})
					}
				}
			)
			return res.json({
				success: true,
			})
		} else {
			res.status(500).json({
				message: 'Відмовлено в доступі, це не ваша стаття',
			})
		}
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось удалить',
		})
	}
}
