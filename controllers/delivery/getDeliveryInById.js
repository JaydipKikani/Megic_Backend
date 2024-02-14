const express = require("express");
const router = express.Router();
const { DeliveryIn } = require("../../models/delivery");

// Other imports and middleware

const getDeliveryInById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the DeliveryIn records by Reservation ID
        const deliveryInRecords = await DeliveryIn.find({ r_id: id });

        const modifiedRecords = deliveryInRecords.map(deliveryData => {
            const { fuel_gauge_numerator, fuel_gauge_denominator, ...rest } = deliveryData.toObject();
            return {
                ...rest,
                fuel_gauge: `${fuel_gauge_numerator}/${fuel_gauge_denominator}`,
            };
        });
        
        res.status(200).json({
            status: true,
            error: false,
            data: modifiedRecords,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status: false,
            error: true,
            msg: "Internal Server Error",
        });
    }
};

// Other routes and controllers

module.exports = {
    getDeliveryInById,
    // Other exports
};
