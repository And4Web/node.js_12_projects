const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  title: {
    type: String, required: true
  },
  category: {
    type: String, required: true
  },
  author: {
    type: String, required: true
  },
  body: {
    type: String, required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  mainImage: {
    type: String,
    required: true
  }
},{
  timeStamps: true
})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;