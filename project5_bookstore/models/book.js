const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  category: {type: String, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true},
  publication: {type: String, required: true},
  date: {type: Date, default: date.now()},
  cover: {type: String, required: true},
},{
  timestamps: true,
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;