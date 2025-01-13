const express = require('express');
const { addNewPost, createNewPost } = require('../controllers/postsController');
const router = express();
const path = require('path');
const multer = require('multer');
const { postValidation } = require('../validation/postValidation');
const { runValidation } = require('../validation');

const Post = require('../models/post');

// Multer file upload
// const uploads = multer({dest: path.join("public",'images')})
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.join(__dirname, '..', "public",'images'))
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
})

const uploads = multer({storage: storage});

// Add new post get page
router.get('/add', addNewPost);

// Add new post
router.post('/add', uploads.single('mainimage'), postValidation, runValidation, createNewPost);

// show all posts related to same category
router.get('/show/:category', async (req, res)=>{
  let categoryParam = req.params.category;
  const posts = await Post.find({category: categoryParam});

  const renderPath = path.join(__dirname, '..', 'views','index')

  console.log('category posts >>> ', posts)
  // res.send('category found >>> ', req.params.category)
  res.render(renderPath, {title: req.params.category, posts: posts, truncatedText: function(text, length){
    let truncatedText = text.substring(0,length);
    return truncatedText;
  }})
})



module.exports = router;