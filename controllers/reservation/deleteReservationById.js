const express = require('express');
const Reservation = require('../../models/reservation');
const router = express.Router();

// Delete a reservation by ID
const deleteReservationById = async (req, res) => {
  try {
    const reservationId = req.params.id;

    // Validate if the provided ID is valid
    if (!reservationId) {
      return res.status(400).json({
        status: false,
        error: true,
        msg: 'Invalid reservation ID',
      });
    }

    const reservation = await Reservation.findByIdAndDelete(reservationId);

    if (!reservation) {
      return res.status(404).json({
        status: false,
        error: true,
        msg: 'Reservation not found',
      });
    }

    return res.status(200).json({
      status: true,
      error: false,
      msg: 'Delete Reservation By ID successfully.',
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
  deleteReservationById,
};
