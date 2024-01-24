const express = require("express");
const Reservation = require("../../models/reservation");
const router = express.Router();

// Insert a new reservation
const addReservation = async (req, res) => {
  try {
    const reservationData = req.body;

    // Check if there is any existing reservation for the same general_id and overlapping date range
    const existingReservation = await Reservation.findOne({
      general_id: reservationData.general_id,
      $or: [
        {
          start_date: { $lt: reservationData.return_date },
          return_date: { $gte: reservationData.start_date },
        },
        {
          start_date: { $gte: reservationData.start_date },
          return_date: { $lte: reservationData.return_date },
        },
      ],
    });

    if (existingReservation) {
      return res.status(400).json({
        status: false,
        error: true,
        msg: "The vehicle is already reserved for the specified date range.",
      });
    }

    // If no existing reservation, create a new reservation
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
