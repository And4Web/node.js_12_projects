const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

//validator 
const {authValidation} = require('../validations/authValidation')
const {runValidation} = require('../validations/index')

const multer = require('multer')
const uploads = multer({dest: "uploads/"})

router.get('/', (req, res)=>{
  res.status(200).json({"message":"users page"})
})

router.get('/register', (req, res)=>{
  res.render('register', {title: 'Register'})
})

router.post('/register', uploads.single('profileimage'), authValidation, runValidation, (req, res)=>{
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;
  // console.log(password, password2, password === password2)
  
  const errors = validationResult(req).array()
  console.log("errors: ", errors)

  //form validator
  // const validation = {
  //   name: body(name).isEmpty(),
  //   email: body(email).isEmail(),
  //   password: body(password).isEmpty().isLength({min: 8}),
  //   password2: body(password2).isEmpty().equals(password)
  // }
  // const errors = validationResult()
  // console.log('validation Errors: ', errors)
    
  if(req.file){
    console.log("uploading file...")
    const profileImage = req.file.filename;
    // console.log(profileImage);
  } else{
    const profileImage = 'noimage.jpg';
    console.log('no file...')
  }

  // res.render('register', {title: 'Register'})
})

router.get('/login', (req, res)=>{
  res.render('login', {title: 'Login'})
})

module.exports = router;