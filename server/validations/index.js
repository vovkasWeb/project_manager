import { body } from 'express-validator'

export const loginValidation = [
	body('email', 'Неправильний формат пошти').isEmail(),
	body('password', 'Пароль має бути мінімум 5 символів').isLength({
		min: 5,
	}),
]

export const registerValidation = [
	body('email', 'Неправильний формат пошти').isEmail(),
	body('password', 'Пароль має бути мінімум 5 символів').isLength({
		min: 5,
	}),
	body('fullName', 'Вкажіть імя').isLength({ min: 3 }),
	body('avatarUrl', 'Невірне посилання на аватарку').optional().isURL(),
]

export const ProjectCreateValidation = [
	body('name', 'Введіть назву проекту').isLength({ min: 2 }).isString(),
	body('text', 'Введіть короткий опис проєкту').isLength({ min: 10 }).isString(),
	body('text', 'Введіть основний опис проекту').isLength({ min: 10 }).isString(),
	body('imageUrl', 'Неправильне посилання на зображення').optional().isString(),
]
