const {check} = require('express-validator');

exports.projectValidation = [
  check('title').not().isEmpty().withMessage('Title is required').isLength({min:8}).withMessage('Title must contain at least 8 characters'),
  check('service').not().isEmpty().withMessage('Service is required').isLength({min:8}).withMessage('Service must contain at least 8 characters'),
  check('client').not().isEmpty().withMessage('Client is required').isLength({min:8}).withMessage('Client must contain at least 8 characters'),
  check('description').not().isEmpty().withMessage('Description is required').isLength({min:100}).withMessage('Description must contain at least 100 characters'),
  check('url').not().isEmpty().withMessage('URL is required').isURL().withMessage('URL must be a valid URL'),
  check('projectdate').not().isEmpty().withMessage('Project date is required').isDate().withMessage('Project date must be a valid date'),
  
]