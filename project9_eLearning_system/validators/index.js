const {validationResult} = require('express-validator');

const runValidation = (req, res, next) => {  
    const {error} = validationResult(req);
    
    if(!error.isEmpty()){
      req.validationErrors = errors.array().map(i=>i.msg);

      // res.status(422).json({errors: req.validationErrors})
      // res.render('register', {errors: errors.array()})
      // console.log('validation errors >>> ', req.validationErrors)
    }

    next();
}

module.exports = runValidation;