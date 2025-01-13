const express = require('express');
const router = express.Router();
const category = require('../models/category');
const { runValidation } = require('../validation');
const {categoryValidation} = require('../validation/categoryValidation');
const { createNewCategory } = require('../controllers/categoriesController');


// add category
router.get('/add', async (req, res)=>{
  const categories = await category.find({}); 
  // res.send({categories})
  res.render('addcategory', {"title": "Add Category"});
})

// create a new category
router.post('/add', categoryValidation, runValidation, createNewCategory)



module.exports = router;