const express = require("express");
const { loginCustomer } = require("../../controllers/customer/front/loginCustomer");
const emailVerification = require("../../controllers/customer/front/emailVerification");
const addCustomer = require("../../controllers/customer/front/addCustomer");
const upload = require("../../middlewares/upload");
const updateCustomer = require("../../controllers/customer/front/updateCustomer");

const router = express.Router();

router.post("/login", loginCustomer);
router.post("/send-verification-email", emailVerification);
router.post("/add", upload.single("licence"), addCustomer);
router.post("/update/:id", upload.single("licence"), updateCustomer);

module.exports = {
  custRoute: router,
};

