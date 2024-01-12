const { Router } = require("express");
const { addModel } = require("../controllers/model/addModel");
const { listModel } = require("../controllers/model/listModel");

const router = Router();

router.post("/add", addModel);

router.get("/", listModel);

module.exports = {
    modelRouter: router,
};
