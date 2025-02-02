const mongoose = require('mongoose');

const dbConfig = async (dbUrl) => {
  try {
    await mongoose.connect(dbUrl);
    console.log('<<< MongoDB Connection successful >>>')
  } catch (error) {
    console.log('<<< MongoDB Connection Error >>> ', error.message);
  }
}

module.exports = dbConfig;