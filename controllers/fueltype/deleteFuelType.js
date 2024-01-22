const express = require('express');
const router = express.Router();
const { FuelType } = require("../../models/vehicle");

// Delete a FuelType entry
const deleteFuelType = async (req, res) => {
    try {
        const { id } = req.params;
        const existingFuelType = await FuelType.findById(id);
        if (!existingFuelType) {
            return res.status(404).json({
                status: false,
                error: true,
                msg: 'FuelType not found'
            });
        }

        await existingFuelType.remove();

        return res.json({
            status: true,
            error: false,
            msg: 'FuelType deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            status: true,
            error: false,
            msg: 'Internal Server Error'
        });
    }
};

module.exports = {
    deleteFuelType
};