const express = require('express');
const router = express.Router();
const { Manufacturer } = require('../../models/vehicle');

// Add a new Manufacturer entry
const addManufacturers = async (req, res) => {
    try {
        const { name } = req.body;
        const existingManufacturer = await Manufacturer.findOne({ name });
        if (existingManufacturer) {
            return res.status(201).json({
                status: false,
                error: true,
                msg: 'Manufacturer already exists',
            });
        }

        const newManufacturer = new Manufacturer({ name });
        await newManufacturer.save();

        return res.status(201).json({
            status: true,
            error: false,
            msg: 'Manufacturer added successfully',
            data: newManufacturer,
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
    addManufacturers
};