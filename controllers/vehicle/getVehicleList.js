const express = require('express');
const {
    General,
    GeneralInfo,
    Manufacturer,
    Model,
    DamageMaintenance
} = require("../../models/vehicle");

const getVehicleList = async (req, res) => {
    try {
        const vehicles = await General.find({}, 'manufacturer model license_plate status')
            .populate({
                path: 'general_info',
                select: 'license_plate damage_maintenance',
            })
            .populate('manufacturer', 'name')
            .populate('model', 'name')
            .exec();
        return res.json({
            status: false,
            error: true,
            msg: "Get Vehicle List Successfully",
            data: vehicles
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: true,
            msg: error.message,
        });
    }
};

module.exports = {
    getVehicleList
};