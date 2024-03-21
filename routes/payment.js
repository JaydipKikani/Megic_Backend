const { Router } = require("express");
const multer = require('multer');
const { addpaymentInvoice } = require("../controllers/invoice/addpaymentInvoice");

const router = Router();
const upload = multer();

router.post("/add", upload.none(), addpaymentInvoice);

module.exports = {
    paymentRouter: router,
};
