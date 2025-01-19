const {check} = require('express-validator');

const bookValidation = [
  check('title').not().isEmpty().withMessage("Title is required.").isLength({min:8}).withMessage("Title must have at least 8 characters."),
  check('description').not().isEmpty().withMessage("Description is required.").isLength({min:8}).withMessage("Description must have at least 8 characters."),
  check('category').not().isEmpty().withMessage("Category is required."),
  check('author').not().isEmpty().withMessage("Author is required.").isLength({min:8}),
  check('publication').not().isEmpty().withMessage("Publication is required.")
]

module.exports = bookValidation;