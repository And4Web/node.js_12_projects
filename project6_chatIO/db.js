const mongoose = require('mongoose');

const dbConfig = async (dbURI) => {
  try {
    await mongoose.connect(dbURI);
    console.log(`~~~ MongoDB connection successful ~~~`);    
  } catch (error) {
    console.log(`<<< MongoDB connection Error >>> `, error.message);
  }
}

module.exports = dbConfig;