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
  OverviewInfo,
} = require("../../models/vehicle");

// Create a new GeneralInfo entry
const createVehicle = async (req, res) => {
  try {
    const generalInfoData = req.body.generalInfo;

    // Filter out empty fields from tags
    const processedTags = req.body.generalInfo.tags.map(tag => ({ name: tag.name, value: null }));

    const generalInfo = new GeneralInfo({
      ...generalInfoData,
      tags: processedTags,
    });

    const allGeneralInfo = await generalInfo.save();

    let allInsuranceInfo;
    // Check if insuranceInfo has non-empty fields
    const insuranceInfoData = req.body.insuranceInfo;
    const hasInsuranceInfoFields = insuranceInfoData && Object.values(insuranceInfoData).some(value => value !== undefined);

    if (hasInsuranceInfoFields) {
      const insuranceInfo = new InsuranceInfo({
        ...insuranceInfoData,
        general_info: allGeneralInfo._id,
      });
      allInsuranceInfo = await insuranceInfo.save(); // Initialize the variable here
    }

    const allVariables = [];
    for (const variableData of req.body.variables) {
      // Check if any variable has non-empty fields
      const hasVariableFields = Object.values(variableData).some(value => value !== undefined);

      if (hasVariableFields) {
        const variables = new Variables({
          ...variableData,
          general_info: allGeneralInfo._id,
        });
        const allVariable = await variables.save();
        allVariables.push(allVariable);
      }
    }

    // Check if financialInfo has non-empty fields
    let allFinancialInfo;
    const financialInfoData = req.body.financialInfo;
    const hasFinancialInfoFields = financialInfoData && Object.values(financialInfoData).some(value => value !== undefined);

    if (hasFinancialInfoFields) {
      const financialInfo = new FinancialInfo({
        ...financialInfoData,
        general_info: allGeneralInfo._id,
      });
      allFinancialInfo = await financialInfo.save(); // Initialize the variable here
    }

    // Check if general has non-empty fields
    let allGeneral;
    const generalData = req.body.general;
    const hasGeneralFields = generalData && Object.values(generalData).some(value => value !== undefined);

    if (hasGeneralFields) {
      const general = new General({
        ...generalData,
        general_info: allGeneralInfo._id,
      });
      allGeneral = await general.save();
    }

    // Check if damageMaintenance has non-empty fields
    let allDamageMaintenance;
    const damageMaintenanceData = req.body.damageMaintenance;
    const hasDamageMaintenanceFields = damageMaintenanceData && Object.values(damageMaintenanceData).some(value => value !== undefined);

    if (hasDamageMaintenanceFields) {
      const damageMaintenance = new DamageMaintenance({
        ...damageMaintenanceData,
        general_info: allGeneralInfo._id,
      });
      allDamageMaintenance = await damageMaintenance.save();
    }

    const allDamages = [];
    for (const damageData of req.body.damage) {
      // Check if any damage has non-empty fields
      const hasDamageFields = Object.values(damageData).some(value => value !== undefined);

      if (hasDamageFields) {
        const damage = new Damage({
          ...damageData,
          general_info: allGeneralInfo._id,
        });

        const allDamage = await damage.save();
        allDamages.push(allDamage);
      }
    }

    // Check if document has non-empty fields
    let allDocument;
    const documentData = req.body.document;
    const hasDocumentFields = documentData && Object.values(documentData).some(value => value !== undefined);

    if (hasDocumentFields) {
      const document = new Document({
        ...documentData,
        general_info: allGeneralInfo._id,
      });
      allDocument = await document.save();
    }

    let allOverview;
    const overviewData = req.body.overviewInfo;
    const overviewFields = overviewData && Object.values(overviewData).some(value => value !== undefined);

    if (overviewFields) {
      const overviewInfo = new OverviewInfo({
        ...overviewData,
        general_info: allGeneralInfo._id,
      });
      allOverview = await overviewInfo.save();
    }

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
        Overview: allOverview
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
