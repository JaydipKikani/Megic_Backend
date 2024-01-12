const express = require('express');
const router = express.Router();
const { FuelType } = require("../../models/vehicle");

// List all FuelType entries
const listFuelTypes = async (req, res) => {
    try {
        const fuelTypes = await FuelType.find();
        return res.json({
            status: true,
            error: false,
            msg: 'FuelType List successfully',
            data: fuelTypes
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
    listFuelTypes
};