
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/document");

const { addDocument } = require("../controllers/document/addDocument");
const { updateDocument } = require("../controllers/document/updateDocument");
const { getDocumentById } = require("../controllers/document/getDocumentbyId");
const { deleteDocument } = require("../controllers/document/deleteDocument");
const { deleteDocumentById } = require("../controllers/document/deleteDocumentById");



// Set up route to handle image uploads using the controller
router.post('/add', upload.array('document'), addDocument);
router.patch("/:id", upload.array('document'), updateDocument);
router.get("/:id", upload.array('document'), getDocumentById);
router.delete("/:id", upload.array('document'), deleteDocument);
router.delete("/gerenal/:id", upload.array('document'), deleteDocumentById);

module.exports = {
    documentRoute: router,
};
