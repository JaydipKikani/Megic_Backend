const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Manufacturer, Model } = require("../../models/vehicle");

const getalllistModel = async (req, res) => {
    try {
        // Find models based on the manufacturer ID
        const models = await Model.find().select('-__v');;

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
    getalllistModel
};
