const { Router } = require("express");
const { addModel } = require("../controllers/model/addModel");
const { listModel } = require("../controllers/model/listModel");
const { getalllistModel } = require("../controllers/model/getalllistModel");

const router = Router();

router.post("/add", addModel);

router.get("/:id", listModel);
router.get("/", getalllistModel);
module.exports = {
    modelRouter: router,
};
