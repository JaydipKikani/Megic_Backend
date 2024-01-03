const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
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
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return /^[0-9]{10}$/.test(value);
        },
        message: "Invalid contact",
      },
    },
    comp_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    cust_type: {
      type: String,

    },
    postal_code: {
      type: Number,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    sub_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscriptions",
    },

    driverInfo: {
      name: {
        type: String,
      },
      address: {
        type: String,
      },
      phone: {
        type: String,
      },
      email: {
        type: String,
      },
    },

    dob: Date,
    licence: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema, "Customer");

module.exports = Customer;
