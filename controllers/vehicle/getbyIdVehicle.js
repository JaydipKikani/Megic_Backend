const express = require('express');
const { GeneralInfo,
    InsuranceInfo,
    Variables,
    FinancialInfo,
    General,
    DamageMaintenance,
    Damage,
    Document } = require("../../models/vehicle");

// List all FuelType entries
const getbyIdVehicle = async (req, res) => {
    try {
        const generalInfoId = req.params.id;

        const generalInfo = await GeneralInfo.findById(generalInfoId);
        if (!generalInfo) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        const insuranceInfo = await InsuranceInfo.findOne({ general_info: generalInfoId });
        const variables = await Variables.find({ general_info: generalInfoId });
        const financialInfo = await FinancialInfo.findOne({ general_info: generalInfoId });
        const generalData = await General.findOne({ general_info: generalInfoId });
        const damageMaintenance = await DamageMaintenance.findOne({ general_info: generalInfoId });
        const damages = await Damage.find({ general_info: generalInfoId });
        const document = await Document.findOne({ general_info: generalInfoId });

        return res.json({
            status: false,
            error: true,
            msg: "Get Vehicle By ID Successfully",
            data: {
                GeneralInfo: generalInfo,
                InsuranceInfo: insuranceInfo,
                Variables: variables,
                FinancialInfo: financialInfo,
                General: generalData,
                DamageMaintenance: damageMaintenance,
                Damages: damages,
                Document: document
            }
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
    getbyIdVehicle
};