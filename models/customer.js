const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email",
      },
    },
    contact: {
      type: String,
      required: true,
      min: 10,
      validate: {
        validator: function (value) {
          return /^[0-9]{10}$/.test(value);
        },
        message: "Invalid contact",
      },
    },
    member: {
      type: String,
      required: true,
      enum: ["member1", "member2", "member3"],
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema, "Customer");

module.exports = Customer;
