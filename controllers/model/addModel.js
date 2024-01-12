const express = require('express');
const router = express.Router();
const { Manufacturer, Model } = require('../../models/vehicle');

// Add a new Manufacturer entry
const addModel = async (req, res) => {
    try {
        const { name, manufacturer } = req.body;
        const existingManufacturer = await Manufacturer.findById(manufacturer);
        if (!existingManufacturer) {
            return res.status(400).json({ error: 'Manufacturer not found' });
        }

        const model = new Model({ name, manufacturer });
        await model.save();
        return res.status(201).json({
            status: true,
            error: false,
            msg: 'Model Add Successfully',
            data: model
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
    addModel
};