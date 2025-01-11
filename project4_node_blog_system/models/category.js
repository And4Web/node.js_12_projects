const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  
},{
  timeStamps: true
})

const Category = mongoose.model('Category', PostSchema);

module.exports = Category;