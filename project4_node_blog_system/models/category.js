const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  category:{
    type: String,
    required: true
  }
},{
  timeStamps: true
})

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;