const { Router } = require("express");
const { createCompany } = require("../controllers/company/createCompany");
const { updateCompany } = require("../controllers/company/updateCompany");
const { getCompany } = require("../controllers/company/getCompany");
const { deleteCompany } = require("../controllers/company/deleteCompany");
const { getCompanyList } = require("../controllers/company/getCompanyList");

const router = Router();

router.post("/add", createCompany);

router.patch("/:id", updateCompany);

router.delete("/:id", deleteCompany);

router.get("/:id", getCompany);

router.get("/", getCompanyList);

module.exports = {
  companyRouter: router,
};
