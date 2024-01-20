const { Router } = require("express");
const { createVehicle } = require("../controllers/vehicle/createVehicle");
const { updateVehicle } = require("../controllers/vehicle/updateVehicle");
const { getbyIdVehicle } = require("../controllers/vehicle/getbyIdVehicle");
const { getVehicleList } = require("../controllers/vehicle/getVehicleList");
const { deleteByIdVehicle } = require("../controllers/vehicle/deleteByIdVehicle");

const router = Router();

router.post('/add', createVehicle);
router.patch("/:id", updateVehicle);
router.get("/:id", getbyIdVehicle);
router.get("/", getVehicleList);
router.delete("/:id", deleteByIdVehicle);

module.exports = {
  vehicleRouter: router,
};
