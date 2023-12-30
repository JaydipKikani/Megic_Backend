const express = require("express");

const multer = require("multer");
const { storage } = require("../index");
const {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomer,
} = require("../controllers/customer/customer");

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", getCustomer);
router.post("/add", upload.single("image"), createCustomer);
router.patch("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = {
  customerRoute: router,
};
