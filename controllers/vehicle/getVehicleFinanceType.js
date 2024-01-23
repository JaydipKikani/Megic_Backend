const express = require("express");
const { FinanceTypes } = require("../../models/vehicle");

const getVehicleFinanceType = async (req, res) => {
  try {
    const vehicleFinanceType = await FinanceTypes.find();
    
    return res.status(200).json({
      status: true,
      error: false,
      msg: "List of Vehicle Finance Type retrieved successfully",
      data: vehicleFinanceType,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      error: true,
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  getVehicleFinanceType,
};
