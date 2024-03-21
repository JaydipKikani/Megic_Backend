const { Router } = require("express");
const { createVehicle } = require("../controllers/vehicle/createVehicle");
const { updateVehicle } = require("../controllers/vehicle/updateVehicle");
const { getbyIdVehicle } = require("../controllers/vehicle/getbyIdVehicle");
const multer = require('multer');
const upload = multer();

const {
  deleteByIdVehicle,
} = require("../controllers/vehicle/deleteByIdVehicle");
const {
  getVehicleModalList,
} = require("../controllers/vehicle/getVehicleModalList");
const { getVehicleList } = require("../controllers/vehicle/getVehicleList");
const {
  getVehicleCategories,
} = require("../controllers/vehicle/getVehicleCategories");
const {
  getVehicleFinanceType,
} = require("../controllers/vehicle/getVehicleFinanceType");
const { filterVehicle } = require("../controllers/vehicle/filterVehicle");
const { createupdateVisibilite } = require("../controllers/vehicle/createupdateVisibilite");
const { getbyIdVisibilite } = require("../controllers/vehicle/getbyIdVisibilite");

const router = Router();

router.post("/addvisibilite", createupdateVisibilite);
router.get("/visibilite/:id", getbyIdVisibilite);
router.post("/add", createVehicle);
router.patch("/:id", updateVehicle);
router.get("/:id", getbyIdVehicle);
router.post("/data/search", upload.any(), filterVehicle);
router.get("/vehiclelist/dropdown/:id", getVehicleModalList);
router.get("/", getVehicleList);
router.get("/category/categorylist", getVehicleCategories);
router.get("/finance/financetype", getVehicleFinanceType);
router.delete("/:id", deleteByIdVehicle);

module.exports = {
  vehicleRouter: router,
};
