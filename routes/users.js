const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/newapp')
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });



// Define User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;