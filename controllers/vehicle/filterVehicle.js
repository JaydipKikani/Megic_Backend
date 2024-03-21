const { General, DamageMaintenance } = require("../../models/vehicle");

const filterVehicle = async (req, res) => {
  try {
    const { searchname, vehicle_location, status } = req.body;

    let query = {};

    // Check if there's a search query
    if (searchname) {
      query["manufacturer"] = { $regex: searchname, $options: "i" };
    }

    // Add filters if they exist in the request
    if (vehicle_location) {
      query["vehicle_location"] = { $regex: vehicle_location, $options: "i" };
    }

    if (status) {
      query["status"] = status;
    }
    // Populate the manufacturer and model fields
    const vehicles = await General.find(query)
      .populate({
        path: "manufacturer",
        select: "name", // Ensure only the name field is populated
        model: "Manufacturer", // Specify the model to populate
      })
      .populate({
        path: "model",
        select: "name", // Ensure only the name field is populated
        model: "Model", // Specify the model to populate
      })
      .exec();

    if (vehicles.length === 0) {
      return res.json({
        status: true,
        error: false,
        msg: "No vehicles match the search criteria",
        data: [],
      });
    }

    const findDamageInfo = await DamageMaintenance.find();

    const formattedVehicles = vehicles.map((vehicle) => {
      const generalInfo = vehicle.general_info || {
        license_plate: null,
        damage_maintenance: null,
      };

      const damageMaintenance = findDamageInfo
        .filter((item) => item.general_info.equals(vehicle.general_info._id))
        .map((item) => ({
          next_mileage: item.next_mileage,
          next_date: item.next_date,
        }));

      return {
        _id: vehicle._id,
        general_id: generalInfo._id,
        manufacturer: vehicle.manufacturer
          ? vehicle.manufacturer.name
          : "Unknown", // Check if manufacturer is populated
        model: vehicle.model ? vehicle.model.name : "Unknown", // Check if model is populated
        license_plate: generalInfo.license_plate,
        vehicle_location: vehicle.vehicle_location,
        vehicle_id: vehicle.model ? vehicle.model._id : null, // Check if model is populated
        status: vehicle.status,
        active: vehicle.active,
        damage_maintenance: damageMaintenance[0] || null,
      };
    });

    return res.json({
      status: true,
      error: false,
      msg: "Get Vehicle List Successfully",
      data: formattedVehicles,
    });
  } catch (error) {
    console.error("Error in filterVehicle:", error);
    return res.status(500).json({
      status: false,
      error: true,
      msg: "Internal server error",
    });
  }
};

module.exports = {
  filterVehicle,
};
