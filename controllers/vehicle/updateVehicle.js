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
    Document
} = require("../../models/vehicle");

const updateVehicle = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const generalInfoId = req.params.id;

        // Update data in GeneralInfo
        const updatedGeneralInfo = await GeneralInfo.findByIdAndUpdate(
            generalInfoId,
            { $set: req.body.generalInfo },
            { new: true }
        );

        // Update data in InsuranceInfo
        const updatedInsuranceInfo = await InsuranceInfo.findOneAndUpdate(
            { general_info: generalInfoId },
            { $set: req.body.insuranceInfo },
            { new: true }
        );

        // Update data in Variables
        await Variables.deleteMany({ general_info: generalInfoId });
        const updatedVariables = await Variables.insertMany(
            req.body.variables.map(variableData => ({ ...variableData, general_info: generalInfoId }))
        );

        // Update data in FinancialInfo
        const updatedFinancialInfo = await FinancialInfo.findOneAndUpdate(
            { general_info: generalInfoId },
            { $set: req.body.financialInfo },
            { new: true }
        );

        // Update data in General
        const updatedGeneral = await General.findOneAndUpdate(
            { general_info: generalInfoId },
            { $set: req.body.general },
            { new: true }
        );

        const updatedDamageMaintenance = await DamageMaintenance.findOneAndUpdate(
            { general_info: generalInfoId },
            { $set: req.body.damageMaintenance },
            { new: true }
        );


        await Damage.deleteMany({});
        const updatedDamages = await Promise.all(req.body.damage.map(async damageData => {
            const damage = new Damage({ ...damageData, general_info: generalInfoId });
            const savedDamage = await damage.save();
            return savedDamage;
        }));

        // Update data in Document
        const updatedDocument = await Document.findOneAndUpdate(
            { general_info: generalInfoId },
            { $set: req.body.document },
            { new: true }
        );

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
                Damages: updatedDamages,
                Document: updatedDocument
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