const express = require('express');
const router = express();

const { getAllPosts } = require('../controllers/postsController');

// render all posts on Home Page
router.get('/', getAllPosts)

// 


module.exports = router