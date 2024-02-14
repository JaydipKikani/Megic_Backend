const express = require("express");
const {
  General,
  GeneralInfo,
  Manufacturer,
  Model,
  DamageMaintenance,
} = require("../../models/vehicle");

const getVehicleList = async (req, res) => {
  try {
    const vehicles = await General.find(
      {},
      "manufacturer model license_plate vehicle_location status active general_info"
    )
      .populate({
        path: "general_info",
        select: "license_plate damage_maintenance",
      })
      .populate("manufacturer", "name")
      .populate("model", "_id name")
      .exec();

    const finddamageInfo = await DamageMaintenance.find();
    const formattedVehicles = vehicles.map((vehicle) => {
      const generalInfo = vehicle.general_info || {
        license_plate: null,
        damage_maintenance: null,
      };

      const damageMintance = finddamageInfo
        .filter((item) => item.general_info.equals(vehicle._id))
        .map((item) => ({
          next_mileage: item.next_mileage,
          next_date: item.next_date,
        }));

      return {
        _id: vehicle?._id,
        general_id: generalInfo?._id,
        manufacturer: vehicle?.manufacturer?.name,
        model: vehicle?.model?.name,
        license_plate: generalInfo?.license_plate,
        vehicle_location: vehicle?.vehicle_location,
        vehicle_id: vehicle?.model?._id,
        status: vehicle?.status,
        active: vehicle?.active,
        damage_maintenance: damageMintance[0] || null,
      };
    });

    return res.json({
      status: true,
      error: false,
      msg: "Get Vehicle List Successfully",
      data: formattedVehicles,
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
  getVehicleList,
};
