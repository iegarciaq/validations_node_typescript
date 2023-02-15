import { body } from 'express-validator';

export const register = () => {
    return [
        body('email').trim().not().isEmpty().withMessage
            ('this field is required').isEmail().withMessage
            ('please enter a valid email address'),
        body('firstName').trim().not().isEmpty().isString().withMessage
            ('please enter only letters'),
        body('lastName').trim().not().isEmpty().isString().withMessage
            ('please enter only characters'),
        body('phoneNumber').trim().isInt().withMessage
            ('please enter numbers').isLength({ min: 7, max: 15 }).withMessage
            ('phoneNumber can not be less than 7 and must be more than 15'),
        body('subscribed').isBoolean().withMessage
            ('please enter a true or false value'),
        body('occupation').trim().isIn(['employed', 'self-employed', 'farmer']).withMessage
            ('you must have something doing')
    ]
}

export const confirmPassword = () => {
    return [
        body('password').trim().notEmpty().isLength({ min: 3 }),
        body('confirmPassword').trim().custom((value, { req }) => {
            console.log('value ', value)
            console.log('req ', req)
            if (value !== req.body.password) {
                throw new Error('password not equal to confirm password')
            }
            return true;
        })
    ]
}
