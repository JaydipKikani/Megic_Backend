const express = require("express");
const {
  GeneralInfo,
  InsuranceInfo,
  Variables,
  FinancialInfo,
  General,
  DamageMaintenance,
  Damage,
  Document,
} = require("../../models/vehicle");

// Create a new GeneralInfo entry
const createVehicle = async (req, res) => {
  try {
    const generalInfoData = req.body.generalInfo;

    const generalInfo = new GeneralInfo({
      ...generalInfoData,
      tags: generalInfoData.tags.map(tag => ({
        name: tag.name,
        value: tag.value || null, // Use tag.value or set it to null if undefined
      })),
    });

    const allGeneralInfo = await generalInfo.save();

    const insuranceInfo = new InsuranceInfo({
      ...req.body.insuranceInfo,
      general_info: allGeneralInfo._id,
    });
    const allInsuranceInfo = await insuranceInfo.save();

    const allVariables = [];
    for (const variableData of req.body.variables) {
      const variables = new Variables({
        ...variableData,
        general_info: allGeneralInfo._id,
      });
      const allVariable = await variables.save();
      allVariables.push(allVariable);
    }

    const financialInfo = new FinancialInfo({
      ...req.body.financialInfo,
      general_info: allGeneralInfo._id,
    });
    const allFinancialInfo = await financialInfo.save();

    const general = new General({
      ...req.body.general,
      general_info: allGeneralInfo._id,
    });
    const allGeneral = await general.save();

    const damageMaintenance = new DamageMaintenance({
      ...req.body.damageMaintenance,
      general_info: allGeneralInfo._id,
    });
    const allDamageMaintenance = await damageMaintenance.save();

    const allDamages = [];
    for (const damageData of req.body.damage) {
      const damage = new Damage({
        ...damageData,
        general_info: allGeneralInfo._id,
      });

      const allDamage = await damage.save();
      allDamages.push(allDamage);
    }

    const document = new Document({
      ...req.body.document,
      general_info: allGeneralInfo._id,
    });
    const allDocument = await document.save();
    return res.json({
      status: true,
      error: false,
      msg: "Add Vehicle Successfully",
      data: {
        GeneralInfo: allGeneralInfo,
        InsuranceInfo: allInsuranceInfo,
        Variables: allVariables,
        FinancialInfo: allFinancialInfo,
        General: allGeneral,
        DamageMaintenance: allDamageMaintenance,
        Damages: allDamages,
        Document: allDocument,
      },
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
  createVehicle,
};
