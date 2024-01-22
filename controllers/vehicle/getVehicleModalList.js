const { Model, General } = require("../../models/vehicle");

const getVehicleModalList = async (req, res) => {
  try {
    const vehicles = await General.find()
      .populate({
        path: "general_info",
        select: "license_plate damage_maintenance",
      })
      .populate("model", "name")
      .populate("manufacturer", "name");

    const model = await Model.find();
    const modelIds = model.map((model) => model._id.toString());

    // Filtering vehicles based on matching model ids
    const vehicleList = vehicles
      .filter((vehicle) => modelIds.includes(vehicle.model._id.toString()))
      .map((vehicle) => ({
        name: `${vehicle.manufacturer.name} ${vehicle.model.name}: ${vehicle.general_info.license_plate}`,
        _id: vehicle._id,
      }));
    return res.json({
      status: true,
      error: false,
      msg: "Get Vehicle List Successfully",
      data: vehicleList,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: true,
      msg: error.message,
    });
  }
};

module.exports = { getVehicleModalList };
