const {validationResult} = require('express-validator');

const runValidation = async (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    console.log("Validation Errors >>> ", errors)

    req.validationErrors = errors.array().map(i=>i.msg);
    
    res.send({validationErrors: req.validationErrors});
  }
  next()
}

module.exports = runValidation;