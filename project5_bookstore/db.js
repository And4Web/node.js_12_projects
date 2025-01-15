const mongoose = require('mongoose');

const dbConfig = async (dbURL) => { 
  try {
    await mongoose.connect(dbURL);
    console.log("<<< Mongoose connection successful >>> ")
  } catch (error) {
    console.log("MONGOOSE connection Error >>> ", error.message);
  }
}

module.exports = dbConfig;