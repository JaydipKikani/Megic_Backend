const express = require("express");
const sendMail = require("../services/email");
const { licenceUpload } = require("../middlewares/invoice");

const router = express.Router();

const app = express();

// Increase payload size limit for JSON and URL-encoded data
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

router.post("/sendinvoice", licenceUpload.single("attachments"), sendMail);

module.exports = {
  mailRouter: router,
};
