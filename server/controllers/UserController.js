import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

import UserModel from '../models/User.js'
dotenv.config()

export const register = async (req, res) => {
	try {
		const password = req.body.password
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)

		const doc = new UserModel({
			email: req.body.email,
			fullName: req.body.fullName,
			passwordHash: hash,
		})
		const user = await doc.save()
		const token = jwt.sign(
			{
				_id: user._id,
			},
			process.env.ENCRYPTION_KEY || 'secret123',
			{
				expiresIn: '30d',
			}
		)
		const { passwordHash, ...userData } = user._doc
		res.json({
			...userData,
			token,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не вдалося зареєструватися',
		})
	}
}

export const login = async (req, res) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email })
		if (!user) {
			return res.status(404).json({
				message: 'Користувач не знайдений',
			})
		}
		const isValidPass = await bcrypt.compare(
			req.body.password,
			user._doc.passwordHash
		)
		if (!isValidPass) {
			return res.status(400).json({
				message: 'Невірний логін або пароль',
			})
		}
		const token = jwt.sign(
			{
				_id: user._id,
			},
			process.env.ENCRYPTION_KEY || 'secret123',
			{
				expiresIn: '30d',
			}
		)
		const { passwordHash, ...userData } = user._doc
		res.json({
			...userData,
			token,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не вдалося авторезируватися',
		})
	}
}

 export const getMe = async (req, res) => {
		try {
			console.log(req.userId)
			const user = await UserModel.findById(req.userId)
			if (!user) {
				return res.status(404).json({
					message: 'Користувач не знайдений',
				})
			}
			const { passwordHash, ...userData } = user._doc
			res.json(userData)
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Немає доступу',
			})
		}
 }
