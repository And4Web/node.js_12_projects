const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  books: [{type: mongoose.Schema.Types.ObjectId, ref: "Book"}],
  image: {type: String, required: true},
},{
  timestamps: true,
})

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;