const { default: mongoose } = require("mongoose");

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
  },
  {
    timestamps: true,
  }
);

const driverSchema = mongoose.Schema({
  driver_name: {
    type: String,
  },
  driver_address: {
    type: String,
  },
  driver_phone: {
    type: String,
  },
  driver_email: {
    type: String,
  },
  driver_dob: Date,
  cust_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
});

const Customer = mongoose.model("Customer", customerSchema, "Customer");

const Driver = mongoose.model("Driver", driverSchema, "Driver");

module.exports = {
  Customer,
  Driver,
};
