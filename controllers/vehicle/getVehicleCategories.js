const express = require("express");
const { VehicleCategory } = require("../../models/vehicle");

const getVehicleCategories = async (req, res) => {
  try {
    const vehicleCategories = await VehicleCategory.find();
    
    return res.status(200).json({
      status: true,
      error: false,
      msg: "List of Vehicle Categories retrieved successfully",
      data: vehicleCategories,
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
  getVehicleCategories,
};
