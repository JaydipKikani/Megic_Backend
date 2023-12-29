const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  authcode: {
    type: String,
  },
  date_signup: {
    type: Date,
    default: Date.now,
  },
  date_validated: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema, "User");

module.exports = User;
