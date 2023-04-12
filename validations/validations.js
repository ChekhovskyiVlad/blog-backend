import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'Wrong an email').isEmail(),
    body('password', 'Minimum 5 symbols').isLength({min: 5}),
]

export const registerValidation = [
    body('email', 'Wrong an email').isEmail(),
    body('password', 'Minimum 5 symbols').isLength({min: 5}),
    body('fullName', 'Minimum 3 symbols').isLength({min: 3}),
    body('avatarUrl', 'Wrong URL').optional().isURL(),
]

export const postCreateValidation = [
    body('title', 'Enter article title').isLength({min: 3}).isString(),
    body('text', 'Enter article text'),
    body('tags', 'Wrong a format of tags').optional().isString(),
    body('imageUrl', 'Wrong URL').optional().isString(),
]