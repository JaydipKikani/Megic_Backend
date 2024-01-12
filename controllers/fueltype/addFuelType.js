const express = require('express');
const router = express.Router();
const { FuelType } = require("../../models/vehicle");

// Add a new FuelType entry
const addFuelType = async (req, res) => {
    try {
        const { name } = req.body;
        const existingFuelType = await FuelType.findOne({ name });
        if (existingFuelType) {
            return res.status(400).json({
                status: true,
                error: false,
                msg: 'FuelType already exists'
            });
        }

        const newFuelType = new FuelType({ name });
        await newFuelType.save();
        return res.status(201).json({
            status: true,
            error: false,
            msg: 'FuelType added successfully',
            data: newFuelType,
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
    addFuelType
};