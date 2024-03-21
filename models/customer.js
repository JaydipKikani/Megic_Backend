const { default: mongoose } = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    c_id: { type: Number },
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
    password: {
      type: String,
    },
    contact: {
      type: Number,
    },
    comp_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
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
    vat_number: {
      type: String,
    },
    business: {
      type: String,
    },
    role: {
      type: String,
      enum: ["CLIENT", "MAIN", "AUX", "BASIC"],
      default: "BASIC", // Set a default role if not provided
    },
    sub_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscriptions",
    },
    driver_id: {  // Add this field
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
  },
  {
    timestamps: true,
  }
);

customerSchema.pre("save", async function (next) {
  // Only update c_id if the document is new
  if (this.isNew) {
    try {
      // Find the maximum c_id value in the collection
      const maxCId = await this.constructor
        .findOne({}, { c_id: 1 })
        .sort({ c_id: -1 });

      // Increment the c_id by 1
      const newCId = maxCId ? parseInt(maxCId.c_id) + 1 : 1;

      // Update the c_id field
      this.c_id = newCId.toString();
    } catch (error) {
      return next(error);
    }
  }

  next();
});

const driverSchema = mongoose.Schema({
  driver_first: {
    type: String,
  },
  driver_last: {
    type: String,
  },
  driver_postcode: {
    type: String,
  },
  driver_address: {
    type: String,
  },
  driver_city: {
    type: String,
  },
  driver_country: {
    type: String,
  },
  driver_phone: {
    type: String,
  },
  driver_email: {
    type: String,
  },
  id_card: {
    type: String,
  },
  license: {
    type: String,
  },
  driver_dob: Date,
  // cust_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Customer",
  // },
});

const Customer = mongoose.model("Customer", customerSchema, "Customer");

const Driver = mongoose.model("Driver", driverSchema, "Driver");

module.exports = {
  Customer,
  Driver,
};
