const {check} = require('express-validator');

exports.authValidation = [
  check('name').not().isEmpty().withMessage('Name is Required.'),
  check('email').isEmail().withMessage('invalid Email'),
  check('username').not().isEmpty().withMessage('Username is required.'),
  check('password').isLength({min: 8}).withMessage('Password must be at least 8 character long.'),
  check('password').not().isEmpty().withMessage('Password is required.'),
  // check('password2').equals('password').withMessage('Passwords don\'t match.')
]