const Category = require('../models/category');
const path = require('path');

const createNewCategory =  async (req,res)=>{
  
   const {name} = req.body;

   if(req.validationErrors){
    const errorRenderPath = path.join(__dirname, '..', 'views','addcategory.pug')
    res.render(errorRenderPath, {'errors': req.validationErrors})
   }else{
    const newCategory = await Category.create({
      category: name
    });

    req.flash('success', 'New Category created');
    res.location('/');
    res.redirect('/');
   }
}

module.exports = {
  createNewCategory
}