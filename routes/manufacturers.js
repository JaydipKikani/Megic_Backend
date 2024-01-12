const { Router } = require("express");
const { addManufacturers } = require("../controllers/manufacturer/addManufacturers");
const { listManufacturer } = require("../controllers/manufacturer/listFuelTypes");

const router = Router();

router.post("/add", addManufacturers);

router.get("/", listManufacturer);

module.exports = {
    manufacturerRouter: router,
};
