const express = require("express");
const Reservation = require("../../models/reservation");
const Company = require("../../models/company"); // Import Company model
const Model = require("../../models/vehicle"); // Import Vehicle model
const Customer = require("../../models/customer"); // Import Customer model
const router = express.Router();

// Get a reservation by ID
const getReservationById = async (req, res) => {
  try {
    const reservationId = req.params.id;

    // Validate if the provided ID is valid
    if (!reservationId) {
      return res.status(400).json({
        status: false,
        error: true,
        msg: "Invalid reservation ID",
      });
    }

    // Use populate to include details from referenced models
    const reservation = await Reservation.findById(reservationId)
      .populate({
        path: "company_id",
        select: "name",
      })
      .populate({
        path: "vehicle_id",
        select: "name manufacturer", // Include the fields you want from the Vehicle model
        populate: {
          path: "manufacturer",
          select: "name", // Include the fields you want from the Manufacturer model
        },
      })
      .populate({
        path: "customer_id",
        select: "firstname lastname",
      });

    if (!reservation) {
      return res.status(404).json({
        status: false,
        error: true,
        msg: "Reservation not found",
      });
    }

    return res.status(200).json({
      status: true,
      error: false,
      msg: "Get Reservation Data By ID successfully.",
      data: reservation,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: true,
      msg: error.message,
    });
  }
};

module.exports = {
  getReservationById,
};
