const express = require('express');

const router = express.Router();

// get all books
router.get('/', async(req, res)=>{
  res.render('index', {title: "Available books in our store"})
})

// get book detail
router.get('/details/:bookId', async(req, res)=>{
  res.render('singleBook', {bookId: req.params.bookId})
})

module.exports = router;