const { Router } = require("express");
const { companyData } = require("../controllers/settings/companyData");

const router = Router();

router.get("/", companyData);

module.exports = {
  companyDataRouter: router,
};


