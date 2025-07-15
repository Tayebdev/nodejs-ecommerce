const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "User name is required"]
  },
  slug: {
    type: String,
    lowercase: true
  },
  email: {
    type: String,
    required: [true, "User email is required"],
    unique: true,
    lowercase: true
  },
  phone: String,
  profileImg: String,
  password: {
    type: String,
    required: [true, "User password is required"],
    minlength: [8, "Too short password"]
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true, collection: "User" });

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
