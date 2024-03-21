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
        path: "general_id",
        select: "model manufacturer", // Include the fields you want from the General model
        populate: [
          {
            path: "model",
            select: "name", // Include the fields you want from the Model model
          },
          {
            path: "manufacturer",
            select: "name", // Include the fields you want from the Manufacturer model
          },
          {
            path: "general_info",
            model: "GeneralInfo",
            select: "license_plate damage_maintenance",
          },
        ],
      })
      .populate({
        path: "customer_id",
        select: "firstname lastname",
        populate: {
          path: "driver_id",
          select: "driver_first driver_last",
        },
      });

    if (!reservation) {
      return res.status(404).json({
        status: false,
        error: true,
        msg: "Reservation not found",
      });
    }

    const manufacturerName = reservation.general_id?.manufacturer?.name || "";
    const modelName = reservation.general_id?.model?.name || "";
    const licensePlate = reservation.general_id?.general_info?.license_plate || "";

    const vahiclename = `${manufacturerName} ${modelName}: ${licensePlate}`;
    return res.status(200).json({
      status: true,
      error: false,
      msg: "Get Reservation Data By ID successfully.",
      data: { ...reservation._doc, vahiclename },
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
