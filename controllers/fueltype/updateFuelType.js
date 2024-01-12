const express = require('express');
const router = express.Router();
const { FuelType } = require("../../models/vehicle");

const updateFuelType = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Check if the fuel type exists
        const existingFuelType = await FuelType.findById(id);
        if (!existingFuelType) {
            return res.status(404).json({
                status: false,
                error: true,
                msg: 'FuelType not found'
            });
        }

        // Update the FuelType entry
        existingFuelType.name = name;
        await existingFuelType.save();
        return res.json({
            status: true,
            error: false,
            msg: 'FuelType updated successfully',
            data: existingFuelType
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: true,
            msg: 'Internal Server Error'
        });
    }
};
module.exports = {
    updateFuelType
};