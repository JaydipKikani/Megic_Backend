const express = require('express');
const router = express.Router();
const { Manufacturer, Model } = require("../../models/vehicle");

// List all FuelType entries
const listModel = async (req, res) => {
    try {
        const models = await Model.find().populate('manufacturer');
        return res.status(200).json({
            status: true,
            error: false,
            msg: 'Get Model List Successfully',
            data: models,
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
    listModel
};