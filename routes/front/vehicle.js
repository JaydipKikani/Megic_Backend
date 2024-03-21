const express = require("express");
const { getbyNameVehicle } = require("../../controllers/vehicle/front/getbyNameVehicle");

const router = express.Router();

router.get("/singlevehicle", getbyNameVehicle);

module.exports = {
  vehiRoute: router,
};

