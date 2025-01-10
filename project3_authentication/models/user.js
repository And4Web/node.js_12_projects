const { Timestamp } = require('mongodb');
const mongoose  = require('mongoose');
const bcrypt = require('bcryptjs');

// User schema
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true,
    isRequired: true,
  },
  password: {
    type: String,
    isRequired: true,
  },
  email:{
    type: String,
    isRequired: true,
  },
  name: {
    type: String,
    isRequired: true,
  },
  profileImage: {
    type: String,
    isRequired: true,
  }
},{
  Timestamp: true
})

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
  
  getUserById: function(id, callback){
    User.findById(id, callback)
  },
  
  getUserByUsername: function(username, callback){
    const query = {
      username: username
    }
    User.findOne(query, callback);
  },
  
  comparePassword: function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
      callback(null, isMatch)
    })
  },

  
};