const { Router } = require("express");
const { addFuelType } = require("../controllers/fueltype/addFuelType");
const { updateFuelType } = require("../controllers/fueltype/updateFuelType");
const { listFuelTypes } = require("../controllers/fueltype/listFuelTypes");
const { deleteFuelType } = require("../controllers/fueltype/deleteFuelType");

const router = Router();

router.post("/add", addFuelType);

router.patch("/:id", updateFuelType);

router.delete("/:id", deleteFuelType);

router.get("/", listFuelTypes);

module.exports = {
    fuelRouter: router,
};
