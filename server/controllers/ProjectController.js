import ProjectModel from '../models/Project.js'

export const getAll = async (req, res) => {
	try {
		const projects = await ProjectModel.find().populate('user').exec()
		const newData = projects.map(item => {
			const { user, ...rest } = item._doc
			if (user) {
				const {
					passwordHash,
					createdAt,
					updatedAt,
					email,
					...userWithoutPasswordHash
				} = user._doc
				return {
					...rest,
					user: userWithoutPasswordHash,
				}
			}
			return item
		})
		res.json(newData.reverse())
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить проекты',
		})
	}
}
export const getOne = async (req, res) => {
	try {
		const projectId = req.params.id
		const project = await ProjectModel.findById(projectId)
			.populate('user')
			.exec()
		res.json(project)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Проект не найден',
		})
	}
}

export const create = async (req, res) => {
	try {
		const doc = new ProjectModel({
			name: req.body.name,
			shortDescription: req.body.shortDescription,
			text: req.body.text,
			imageUrl: req.body.imageUrl,
			user: req.userId,
		})
		const projects = await doc.save()
		res.json(projects)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось создать статью',
		})
	}
}
export const update = async (req, res) => {
	console.log(req.userId)
	try {
		const projectId = req.params.id
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
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Обновить не удалось',
		})
	}
}
export const remove = async (req, res) => {
	try {
		const projectId = req.params.id

		ProjectModel.findOneAndDelete({ _id: projectId, user: req.userId }).then(
			doc => {
				if (!doc) {
					return res.status(404).json({
						message: 'Не удалось удалить',
					})
				}
				res.json({
					success: true,
				})
			}
		)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось удалить',
		})
	}
}
