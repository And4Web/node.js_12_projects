const {validationResult} = require('express-validator');

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    req.validationErrors = errors.array().map(i=>i.msg);

    // res.status(422).json({errors: req.validationErrors})
    // res.render('register', {errors: errors.array()})
    console.log('validation errors >>> ', req.validationErrors)
  }
  next();
}