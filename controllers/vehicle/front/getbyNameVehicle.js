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
  Manufacturer,
  Model
} = require("../../../models/vehicle");
const { General_Setting, Visibilite, Option_List } = require("../../../models/generalsetting");

const getbyNameVehicle = async (req, res) => {
  try {
    const { manufacturerName, modelName } = req.query;

    // Find the manufacturer by name
    const manufacturer = await Manufacturer.findOne({ name: manufacturerName });
    if (!manufacturer) {
      return res.status(404).json({
        status: false,
        error: true,
        msg: "Manufacturer not found",
      });
    }

    // Find the model by name and manufacturer ID
    const model = await Model.findOne({ name: modelName, manufacturer: manufacturer._id });
    if (!model) {
      return res.status(404).json({
        status: false,
        error: true,
        msg: "Model not found for the specified manufacturer",
      });
    }

    // Find the general info by model ID
    const generalData = await General.findOne({ model: model._id });
    if (!generalData) {
      return res.status(404).json({
        status: false,
        error: true,
        msg: "Vehicle data not found",
      });
    }

    const generalInfo = await GeneralInfo.findById(generalData.general_info)
      .populate('main_fuel')
      .populate('second_fuel');

    const insuranceInfo = await InsuranceInfo.findOne({ general_info: generalInfo._id });
    const variables = await Variables.find({ general_info: generalInfo._id });
    const financialInfo = await FinancialInfo.findOne({ general_info: generalInfo._id }).populate("finance_type");
    const damageMaintenance = await DamageMaintenance.findOne({ general_info: generalInfo._id });
    const damages = await Damage.find({ general_info: generalInfo._id });
    const overview = await OverviewInfo.findOne({ general_info: generalInfo._id });
    const documents = await Document.findOne({ general_info: generalInfo._id });
    const generalSetting = await General_Setting.findOne({ general_info: generalInfo._id });
    const visibilite = await Visibilite.findOne({ general_info: generalInfo._id });
    const optionList = await Option_List.findOne({ general_info: generalInfo._id });

    return res.json({
      status: true,
      error: false,
      data: {
        msg: "Get Vehicle By Manufacturer and Model Successfully",
        GeneralInfo: generalInfo,
        Manufacturer: manufacturer.name,
        Model: model.name,
        InsuranceInfo: insuranceInfo,
        Variables: variables,
        FinancialInfo: financialInfo,
        General: generalData,
        DamageMaintenance: damageMaintenance,
        Damages: damages,
        Overview: overview,
        Documents: documents ? documents.variants : null,
        GeneralSetting: generalSetting,
        Visibilite: visibilite,
        OptionList: optionList,
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
  getbyNameVehicle,
};
