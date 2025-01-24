const mongoose = require('mongoose');

const dbConfig = async (dbURL) => {
  try {
    await mongoose.connect(dbURL);
    console.log(`~~~ MongoDB connection successfull ~~~`);
  } catch (error) {
    console.log(`~~~ MongoDB connection Error >>> ${error.message}`);
  }
}


module.exports = dbConfig;

