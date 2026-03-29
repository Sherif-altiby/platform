import { body} from 'express-validator'

export const validateRegistration = [
  
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address'),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches( /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).withMessage('Password must contain at least one uppercase letter'),
  
  body('level')
    .notEmpty().withMessage('Level is required')
    .isIn(['first', 'second', 'third']).withMessage('Invalid level'),
  
  body('phone')
    .notEmpty().withMessage('Phone number is required')
    .isMobilePhone().withMessage('Invalid phone number')
    .trim(), 
];



export const  uploadVideoValidation = [
  body('link')
  .notEmpty().withMessage('Name is required')
  .isLength({ min: 20 }).withMessage('Name must be at least 20 characters long'),

  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),

  body('level')
    .notEmpty().withMessage('Level is required')
    .isIn(['first', 'second', 'third']).withMessage('Invalid level'),
]


export const  uploadQuizValidation = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be a string'),

  body('questions')
    .isArray({ min: 1 }).withMessage('At least one quiz question is required'),
    
  body('questions.*.title')
    .notEmpty().withMessage('Question is required')
    .isString().withMessage('Question must be a string'),

  body('questions.*.answers')
    .isArray({ min: 4, max: 4 }).withMessage('provide four answers')
    .custom((answers) => {
      return answers.every((answer) => typeof answer === 'string');
    }).withMessage('All answers must be strings'),

  body('questions.*.correctAnswer')
    .notEmpty().withMessage('Right answer is required')
    .isString().withMessage('Right answer must be a string'),

  body('level')
    .notEmpty().withMessage('Level is required')
    .isIn(['first', 'second', 'third']).withMessage('Invalid level'),
]

export const addCourseValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required'),

  body('subjectId') // Changed from 'subject' to 'subjectId' to match your controller
    .trim()
    .notEmpty().withMessage('Subject ID is required')
    .isMongoId().withMessage('Invalid Subject ID format'),

  body('price')
    .trim()
    .notEmpty().withMessage('Price is required')
    .isNumeric().withMessage('Price must be a number'),

  body('level')
    .trim()
    .notEmpty().withMessage('Level is required')
    .isIn(['first', 'second', 'third']).withMessage('Invalid level'),

  body('offer')
    .optional({ checkFalsy: true })
    .isNumeric().withMessage('Offer must be a number'),

  body('offerExpirt')
    .optional({ checkFalsy: true })
    .isISO8601().withMessage('Offer expiration must be a valid date'),
];