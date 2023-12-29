const { Router } = require("express");
const { createCompany } = require("../controllers/company");

const router = Router();

router.post("/add", createCompany);

router.get("/", (req, res) => {});

module.exports = {
  companyRouter: router,
};
