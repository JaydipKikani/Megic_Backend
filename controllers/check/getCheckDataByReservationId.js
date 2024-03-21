const express = require("express");
const router = express.Router();
const CheckData = require("../../models/checkdata");
const GeneralInfo = require("../../models/vehicle");
const Reservation = require("../../models/reservation");

const getCheckDataByReservationId = async (req, res) => {
    try {
        const { id } = req.params;
        const checkData = await CheckData.findOne({ reservation_id: id });

        const reservationData = await Reservation.findById(id)
            .populate({
                path: 'general_id',
                populate: {
                    path: 'general_info',
                    model: 'GeneralInfo',
                },
            });

        // Check if reservationData or its nested properties are null
        if (!reservationData || !reservationData.general_id || !reservationData.general_id.general_info) {
            return res.status(404).json({
                status: false,
                message: 'Reservation data or related data not found for the provided reservation_id',
                data: null,
            });
        }

        // Extract tags from GeneralInfo and add them to the response
        const tags = reservationData.general_id.general_info.tags;
        // Create a new object with the desired structure
        const responseData = {
            _id: checkData?._id || null,
            exterior_damage: checkData?.exterior_damage || [{}],
            interior_damage: checkData?.interior_damage || [{}],
            suv: checkData?.suv || null,
            tags: tags || null,
        };

        res.status(200).json({
            status: true,
            message: 'Check data retrieved successfully',
            data: responseData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error', data: null });
    }
};

module.exports = {
    getCheckDataByReservationId,
};
