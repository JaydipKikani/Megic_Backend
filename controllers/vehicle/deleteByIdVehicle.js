const express = require('express');
const { GeneralInfo, InsuranceInfo, Variables, FinancialInfo, General, DamageMaintenance, Damage, Document } = require("../../models/vehicle");

// Delete a vehicle by ID
const deleteByIdVehicle = async (req, res) => {
    try {
        const generalInfoId = req.params.id;

        await InsuranceInfo.deleteOne({ general_info: generalInfoId });
        await Variables.deleteMany({ general_info: generalInfoId });
        await FinancialInfo.deleteOne({ general_info: generalInfoId });
        await General.deleteOne({ general_info: generalInfoId });
        await DamageMaintenance.deleteOne({ general_info: generalInfoId });
        await Damage.deleteMany({ general_info: generalInfoId });

        // Now, delete the GeneralInfo document
        const deletedGeneralInfo = await GeneralInfo.findByIdAndDelete(generalInfoId);

        if (!deletedGeneralInfo) {
            return res.status(404).json({
                status: false,
                error: true,
                msg: 'Vehicle not found',
            });
        }

        return res.json({
            status: true,
            error: false,
            msg: 'Delete Vehicle By ID Successfully',
            data: deletedGeneralInfo
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
    deleteByIdVehicle
};
