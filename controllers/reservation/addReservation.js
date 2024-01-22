const express = require("express");
const Reservation = require("../../models/reservation");
const router = express.Router();

// Insert a new reservation
const addReservation = async (req, res) => {
  try {
    const reservationData = req.body;
    const reservation = new Reservation(reservationData);
    await reservation.save();
    return res.status(201).json({
      status: true,
      error: false,
      msg: "Add Reservation successfully.",
      data: reservation,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: false,
        error: true,
        msg: error.message,
      });
    }
    return res.status(500).json({
      status: false,
      error: true,
      msg: error.message,
    });
  }
};

module.exports = {
  addReservation,
};
