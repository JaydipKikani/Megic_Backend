const express = require("express");
const getCustomer = require("../controllers/customer/getCustomer");
const createCustomer = require("../controllers/customer/createCustomer");
const { updateCustomer } = require("../controllers/customer/updateCustomer");
const deleteCustomer = require("../controllers/customer/deleteCustomer");

const router = express.Router();

router.get("/", getCustomer);
router.post("/add", createCustomer);
router.patch("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = {
  customerRoute: router,
};
