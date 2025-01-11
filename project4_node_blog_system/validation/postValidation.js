const {check} = require('express-validator');

exports.postValidation = [
  check('title').not().isEmpty().withMessage('Title is Required.'),
  check('category').exists().withMessage('Category is required').isString().withMessage("Choose a category."),
  check('body').not().isEmpty().withMessage('Body is required.'),
  check('author').isLength({min: 5}).not().isEmpty().withMessage('Author is required and must be of at least 5 characters long.').isString().withMessage("Choose an author."),
]