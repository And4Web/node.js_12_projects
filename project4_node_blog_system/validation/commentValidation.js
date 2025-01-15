const {check} = require('express-validator');

exports.commentValidation = [
  check('name').not().isEmpty().withMessage('Name is required.'),
  check('email').isEmail().not().isEmpty().withMessage("A valid Email is required."),
  check('body').not().isEmpty().withMessage('Add a Relevant comment.'),
  check('postid').not().isEmpty().withMessage("postId is required.")
]

