const mongoose = require('mongoose');

const dbConfig = async (dbURL) => {
  try {
    await mongoose.connect(dbURL);
    console.log(`~~~ MongoDB connection successful ~~~`);    
  } catch (error) {
    console.log(`MongoDB connection error >>> ${error.message}`);
  }

}

module.exports = dbConfig;