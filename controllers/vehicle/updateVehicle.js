const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {
    GeneralInfo,
    InsuranceInfo,
    Variables,
    FinancialInfo,
    General,
    DamageMaintenance,
    Damage,
    OverviewInfo
} = require("../../models/vehicle");

const updateVehicle = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    let updatedDamages;
    try {
        const generalInfoId = req.params.id;

        // Update data in GeneralInfo
        const updatedGeneralInfo = await GeneralInfo.findByIdAndUpdate(
            generalInfoId,
            {
                $set: {
                    ...req.body.GeneralInfo,
                },
            },
            { new: true }
        );

        // Update data in InsuranceInfo
        const updatedInsuranceInfo = await InsuranceInfo.findOneAndUpdate(
            { general_info: generalInfoId },
            { $set: req.body.InsuranceInfo },
            { new: true }
        );

        // Update data in Variables
        await Variables.deleteMany({ general_info: generalInfoId });
        const updatedVariables = await Variables.insertMany(
            req.body.Variables.map(variableData => ({ ...variableData, general_info: generalInfoId }))
        );

        // Update data in FinancialInfo
        const updatedFinancialInfo = await FinancialInfo.findOneAndUpdate(
            { general_info: generalInfoId },
            { $set: req.body.FinancialInfo },
            { new: true }
        );

        // Update data in General
        const updatedGeneral = await General.findOneAndUpdate(
            { general_info: generalInfoId },
            { $set: req.body.General },
            { new: true }
        );

        const updatedDamageMaintenance = await DamageMaintenance.findOneAndUpdate(
            { general_info: generalInfoId },
            { $set: req.body.DamageMaintenance },
            { new: true }
        );

        // Remove existing damages
        await Damage.deleteMany({ general_info: generalInfoId });
        const updatedDamages = await Damage.insertMany(
            req.body.Damages.map(damageData => ({ ...damageData, general_info: generalInfoId }))
        );

        // Update data in OverviewInfo if req.body.Overview is not null
        let updatedOverview;
        if (req.body.Overview) {
            const { _id, ...overviewData } = req.body.Overview; // Exclude _id field
            updatedOverview = await OverviewInfo.findOneAndUpdate(
                { general_info: generalInfoId },
                { $set: overviewData }, // Use overviewData without _id
                { new: true, upsert: true }
            );
        }

        await session.commitTransaction();
        session.endSession();
        return res.json({
            status: false,
            error: true,
            msg: "Update Vehicle Successfully",
            data: {
                GeneralInfo: updatedGeneralInfo,
                InsuranceInfo: updatedInsuranceInfo,
                Variables: updatedVariables,
                FinancialInfo: updatedFinancialInfo,
                General: updatedGeneral,
                DamageMaintenance: updatedDamageMaintenance,
                Damages: updatedDamages || [],
                Overview: updatedOverview || null
            }
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({
            status: false,
            error: true,
            msg: error.message,
        });
    }
};
module.exports = {
    updateVehicle
};
