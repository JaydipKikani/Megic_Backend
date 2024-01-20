const { Router } = require("express");
const { addInvoice } = require("../controllers/invoice/addInvoice");
const { getInvoiceById } = require("../controllers/invoice/getinvoicebyId");
const { deleteInvoiceById } = require("../controllers/invoice/deleteInvoiceById");
const { updateInvoiceById } = require("../controllers/invoice/updateInvoiceById");
const { getInvoicelist } = require("../controllers/invoice/getInvoicelist");
const { invoiceNumber } = require("../controllers/invoice/invoicenumber");

const router = Router();

router.post("/add", addInvoice);
router.get("/invoicenumber", invoiceNumber);
router.get("/:id", getInvoiceById);
router.delete("/:id", deleteInvoiceById);
router.put("/:id", updateInvoiceById);
router.get("/", getInvoicelist);

module.exports = {
    invoiceRouter: router,
};
