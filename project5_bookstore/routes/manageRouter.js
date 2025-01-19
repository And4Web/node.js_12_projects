const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');

// Multer Config
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.join(__dirname, '..','public', 'images'))
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
})

const uploads = multer({storage: storage});

// import controllers
const {addNewBook,editBook} = require('../controllers/booksController')

// import validators
const bookValidation = require('../validation/bookValidation');
const runValidation = require('../validation/index');

// Routes
router.get('/',(req, res)=>{
  res.render('manage', {title: "Manage your bookstore"})
})

// add books
router.post('/books/add', uploads.single("bookcover"), bookValidation, runValidation, addNewBook)

router.get('/books/add',(req, res)=>{
  res.render('addBook', {title: "Add new Book"})
})

//edit books
router.post('/books/edit', uploads.single("bookcover"), bookValidation, runValidation, editBook);

router.get('/books/edit',(req, res)=>{
  res.render('editBook', {title: "Edit Book"})
})

// edit Categories
router.post('/categories',(req, res)=>{})



module.exports = router;