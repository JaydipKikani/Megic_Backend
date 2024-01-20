const express = require("express");
const Reservation = require("../../models/reservation");
const Company = require("../../models/company");

const Customer = require("../../models/customer");

const router = express.Router();

const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
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

    return res.status(200).json({
      status: true,
      error: false,
      msg: "Get List of Reservations successfully.",
      data: reservations,
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
  getReservations,
};
