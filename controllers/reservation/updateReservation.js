        const express = require('express');
const Reservation = require('../../models/reservation');
const router = express.Router();

// Update a reservation by ID
const updateReservation = async (req, res) => {
    try {
        const reservationId = req.params.id;
        const updateData = req.body;

        // Validate if the provided ID is valid
        if (!reservationId) {
            return res.status(400).json({
                status: false,
                error: true,
                msg: 'Invalid reservation ID',
            });
        }

        const reservation = await Reservation.findByIdAndUpdate(
            reservationId,
            updateData,
            { new: true, runValidators: true }
        );

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
            msg: 'Update Reservation Data By ID successfully.',
            data: reservation,
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
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
    updateReservation,
};
