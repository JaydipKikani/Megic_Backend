const mongoose = require('mongoose');

const deliveryOutSchema = new mongoose.Schema({
  km_counter: {
    type: Number,
    required: true
  },
  fuel_gauge_numerator: {
    type: Number,
    required: true
  },
  fuel_gauge_denominator: {
    type: Number,
    required: true
  },
  r_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation',
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

const Delivery = mongoose.model('Delivery', deliveryOutSchema, 'Delivery');

const deliveryInSchema = new mongoose.Schema({
  km_counter: {
    type: Number,
    required: true,
  },
  fuel_gauge_numerator: {
    type: Number,
    required: true
  },
  fuel_gauge_denominator: {
    type: Number,
    required: true
  },
  r_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation",
    required: true,
  },
  photos: {
    type: [String], // Array of photo URLs
    validate: {
      validator: function (value) {
        return value.length <= 12;
      },
      message: "Maximum limit of 12 photos exceeded.",
    },
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  updated_date: {
    type: Date,
  },
});

const DeliveryIn = mongoose.model("DeliveryIn", deliveryInSchema, 'DeliveryIn');


module.exports = {
  Delivery,
  DeliveryIn,
};


