import { body } from 'express-validator'

export const loginValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Пароль должен быть минимум 5 символов').isLength({
		min: 5,
	}),
]

export const registerValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Пароль должен быть минимум 5 символов').isLength({
		min: 5,
	}),
	body('fullName', 'Укажите имя').isLength({ min: 3 }),
	body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
]

export const ProjectCreateValidation = [
	body('name', 'Введите название проекта').isLength({ min: 2 }).isString(),
	body('text', 'Введите короткое описания проекта').isLength({ min: 10 }).isString(),
	body('text', 'Введите основнок описания проекта').isLength({ min: 10 }).isString(),
	body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]
