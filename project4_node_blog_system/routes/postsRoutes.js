const express = require('express');
const { addNewPost, createNewPost } = require('../controllers/postsController');
const router = express();
const multer = require('multer');
const { postValidation } = require('../validation/postValidation');
const { runValidation } = require('../validation');
const uploads = multer({dest: "uploads/"})

// Add new post get page
router.get('/add', addNewPost);

// Add new post
router.post('/add', uploads.single('mainimage'), postValidation, runValidation, createNewPost);



module.exports = router;