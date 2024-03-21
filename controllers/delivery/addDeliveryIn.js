const express = require("express");
const router = express.Router();
const deliveryin = require("../../middlewares/deliveryin");
const { DeliveryIn } = require("../../models/delivery");
const CheckData = require("../../models/checkdata");

const addDeliveryIn = async (req, res) => {
    const { km_counter, fuel_gauge, r_id, status } = req.body;
    try {
        const [numerator, denominator] = fuel_gauge.split('/').map(Number);

        if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
            return res.status(400).json({
                status: false,
                error: true,
                msg: "Invalid fuel_gauge format. Use a valid fraction like '2/8'.",
            });
        }

        const deliveryData = {
            km_counter,
            fuel_gauge_numerator: numerator,
            fuel_gauge_denominator: denominator,
            r_id
        };

        // Check if delivery record already exists
        const existingDelivery = await DeliveryIn.findOne({ r_id });

        if (existingDelivery) {
            // Update the existing record
            existingDelivery.km_counter = deliveryData.km_counter;
            existingDelivery.fuel_gauge_numerator = deliveryData.fuel_gauge_numerator;
            existingDelivery.fuel_gauge_denominator = deliveryData.fuel_gauge_denominator;
            existingDelivery.updated_date = Date.now();
            if (req.files) {
                const photoUrls = req.files.map(file => `/assets/photos/${file.filename}`);
                existingDelivery.photos = photoUrls;
            }

            await existingDelivery.save();
            await CheckData.findOneAndUpdate({ reservation_id: r_id }, { $set: { status } });

            res.status(200).json({
                status: true,
                error: false,
                msg: "Record updated successfully!",
            });
        } else {
            // Create a new record
            const newDelivery = new DeliveryIn(deliveryData);

            // Handle photo uploads
            if (req.files) {
                const photoUrls = req.files.map(file => `/assets/photos/${file.filename}`);
                newDelivery.photos = photoUrls;
            }


            await newDelivery.save();
            await CheckData.findOneAndUpdate({ reservation_id: r_id }, { $set: { status } }, { upsert: true });

            res.status(200).json({
                status: true,
                error: false,
                msg: "Record created successfully!",
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status: false,
            error: true,
            msg: "Internal Server Error",
        });
    }
};

module.exports = {
    addDeliveryIn,
};
