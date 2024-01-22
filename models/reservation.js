const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  general_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "General",
    required: true,
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  extra_km: {
    type: Number,
    default: 0,
  },
  start_date: {
    type: Date,
    required: true,
  },
  dept_loc: {
    type: String,
    required: true,
  },
  return_date: {
    type: Date,
    required: true,
  },
  return_loc: {
    type: String,
    required: true,
  },
  cust_loc: {
    type: String,
    required: true,
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
