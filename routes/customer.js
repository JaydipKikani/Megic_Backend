const express = require("express");

const createCustomer = require("../controllers/customer/createCustomer");
const { updateCustomer } = require("../controllers/customer/updateCustomer");
const deleteCustomer = require("../controllers/customer/deleteCustomer");
const upload = require("../middlewares/upload");
const {
  getCustomer,
  getCustomerById,
} = require("../controllers/customer/getCustomer");

const router = express.Router();

router.get("/", getCustomer);
router.get("/:id", getCustomerById);
router.post("/add", upload.single("licence"), createCustomer);
router.patch("/:id", upload.single("licence"), updateCustomer);
router.delete("/:id", upload.single("licence"), deleteCustomer);

module.exports = {
  customerRoute: router,
};
