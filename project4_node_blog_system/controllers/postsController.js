const Post = require('../models/post');
const Category = require('../models/category');
const path = require('path');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const { render } = require('../routes');

// Get all posts and render
const getAllPosts = async (req, res)=>{
  const renderPath = path.join(__dirname, '../', 'views');
 
  try {
  const posts = await Post.find({});  
  
  if(!posts){
    res.render('error', {error: "No posts found"})
  }
  // console.log("posts >>> ", posts);
  // console.log('dirname >>> ', __dirname)
  // console.log('renderPath >>> ', renderPath)

  res.render(renderPath, {posts: posts, truncatedText: function(text, length){
    let truncatedText = text.substring(0,length);
    return truncatedText;
  }
  });
  } catch (error) {
    res.render(renderPath, {error: error.message})
  }    
}

// Add new Post - render
const addNewPost = async (req, res) => {

  const renderPath = path.join(__dirname , '..' , 'views','addpost')

  const categories = await Category.find({}, {_id:0});
  // console.log('Categories >>> ', categories.map(i=>i.category));
  
  res.render(renderPath, {title: "Add Post", categories: categories.map(i=>i.category)});

  // res.send({message: "add route"})
}


// create new post
const createNewPost = async (req, res) => {
  try {
    let mainImage;
    // get form values
  const {title, category, body, author} = req.body;
  const date = new Date();

  // check image upload
  if(!req.file){
    req.validationErrors.push("Image is required")
  }
  if(req.file){
    mainImage = req.file.filename;

  }else{
    mainImage = 'noimage.jpg';
  }

  // check for errors and create new post
  const renderAddPostPath = path.join(__dirname, '..', 'views/addpost');
  if(req.validationErrors){
    // console.log("validation errors >>> ", req.validationErrors);  

    res.render(renderAddPostPath, {
      "errors": req.validationErrors,
    })
  }else{
    const newPost = await Post.create({
      title, body, category, date, author, mainImage
    })
    const posts = await Post.find().count();
    
    req.flash("success", "New post created.");
    res.location('/');
    res.redirect("/");
    // res.render(renderPath)
  }  
  } catch (error) {
    console.log(error)
  }
  
}

module.exports = {
  getAllPosts,
  addNewPost,
  createNewPost,

}