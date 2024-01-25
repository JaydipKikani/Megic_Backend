const express = require("express");
const sendMail = require("../services/email");
const { licenceUpload } = require("../middlewares/invoice");

const router = express.Router();

router.post("/", licenceUpload.single("attachments"), sendMail);

module.exports = {
  mailRouter: router,
};
