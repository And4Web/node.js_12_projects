const {validationResult} = require('express-validator');

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    // res.status(422).json({errors: errors.array()[0].msg})
    res.render('register', {errors: errors.array()})
  }
  next();
}