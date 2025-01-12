const Category = require('../models/category');

const createNewCategory =  async (req,res)=>{
  
   const {name} = req.body;

   if(req.validationErrors){
    res.render('addcategories', {'errors': req.validationErrors})
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