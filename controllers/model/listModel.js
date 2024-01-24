const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Manufacturer, Model } = require("../../models/vehicle");

const listModel = async (req, res) => {
    try {
        const manufacturerId = req.params.id;

        // Validate that manufacturerId is a valid ObjectId before querying the database
        if (!mongoose.Types.ObjectId.isValid(manufacturerId)) {
            console.error('Invalid manufacturer ID:', manufacturerId);
            return res.status(400).json({
                status: false,
                error: true,
                msg: 'Invalid manufacturer ID',
            });
        }

        // Find the manufacturer based on the provided ID
        const manufacturer = await Manufacturer.findById(manufacturerId);
        if (!manufacturer) {
            console.error('Manufacturer not found for ID:', manufacturerId);
            return res.status(404).json({
                status: false,
                error: true,
                msg: 'Manufacturer not found',
            });
        }

        // Find models based on the manufacturer ID
        const models = await Model.find({ manufacturer: manufacturerId }).select('-__v');;

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
