const mongoose = require('mongoose');
const url = `${process.env.mongoURL}/nodeBlogSystem`;

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully - Blog system...")
  } catch (error) {
    console.log("MongoDB connection Error >>> ", error.message);
    process.exit(1);
  }
} 

module.exports = connectDB;