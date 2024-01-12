const express = require('express');
const router = express.Router();
const { Manufacturer } = require("../../models/vehicle");

// List all FuelType entries
const listManufacturer = async (req, res) => {
    try {
        const manufacturer = await Manufacturer.find();
        return res.json({
            status: true,
            error: false,
            msg: 'Get Manufacturer List Successfully',
            data: manufacturer,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: true,
            msg: 'Internal Server Error',
        });
    }
};

module.exports = {
    listManufacturer
};