const express = require("express");
const router = express.Router();
const {Delivery} = require("../../models/delivery");
const { Customer, Driver } = require("../../models/customer");
const upload = require("../../middlewares/driver");

const addDeliveryOut = async (req, res) => {
    const { km_counter, fuel_gauge, r_id, driver_id } = req.body;

    try {
        // Parse the fuel_gauge fraction
        const [numerator, denominator] = fuel_gauge.split('/').map(Number);

        if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
            // Handle invalid fraction input
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

        const existingDelivery = await Delivery.findOne({ r_id });

        if (existingDelivery) {
            // Update the existing record
            await Delivery.updateOne({ r_id }, { $set: { ...deliveryData, updated_date: Date.now() } });

            // Update or add driver documents
            const driver = await Driver.findById(driver_id);

            if (!driver) {
                return res.status(404).json({
                    status: false,
                    error: true,
                    msg: "Driver not found.",
                });
            }

            // Upload ID Card
            if (req.files && req.files.id_card) {
                driver.id_card = `/assets/document/${req.files.id_card[0].filename}`;
            }

            // Upload License
            if (req.files && req.files.license) {
                driver.license = `/assets/document/${req.files.license[0].filename}`;
            }

            await driver.save();

            res.status(200).json({
                status: true,
                error: false,
                msg: "Record and driver documents updated successfully!",
            });
        } else {
            // Create a new delivery record
            const newDelivery = new Delivery(deliveryData);
            await newDelivery.save();

            // Create or update driver documents
            const driver = await Driver.findById(driver_id);

            if (!driver) {
                return res.status(404).json({
                    status: false,
                    error: true,
                    msg: "Driver not found.",
                });
            }

            // Upload ID Card
            if (req.files && req.files.id_card) {
                driver.id_card = `/assets/document/${req.files.id_card[0].filename}`;
            }

            // Upload License
            if (req.files && req.files.license) {
                driver.license = `/assets/document/${req.files.license[0].filename}`;
            }

            await driver.save();

            res.status(200).json({
                status: true,
                error: false,
                msg: "Record created and driver documents updated successfully!",
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
    addDeliveryOut,
};
