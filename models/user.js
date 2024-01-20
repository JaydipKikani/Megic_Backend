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
  company: {
    type: String,
  },
  company_vat: {
    type: String,
  },
  phone_no: {
    type: String,
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  country: {
    type: String,
  },
  language: {
    type: String,
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
  profilePhoto: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema, "User");

module.exports = User;
