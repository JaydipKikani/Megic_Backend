
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/general");
const { addGeneralImg } = require("../controllers/generalimages/addGeneralImg");
const { getGeneralImgById } = require("../controllers/generalimages/getGeneralImgById");
const { deleteGeneralImg } = require("../controllers/generalimages/deleteGeneralImg");

// const { updateDocument } = require("../controllers/document/updateDocument");
// const { getDocumentById } = require("../controllers/document/getDocumentbyId");
// const { deleteDocument } = require("../controllers/document/deleteDocument");
// const { deleteDocumentById } = require("../controllers/document/deleteDocumentById");



// Set up route to handle image uploads using the controller
router.post('/upload', upload.fields([{ name: 'Header', maxCount: 1 }, { name: 'Photoshoot', maxCount: 1 }]), addGeneralImg);
router.get("/:id", upload.fields([{ name: 'Header', maxCount: 1 }, { name: 'Photoshoot', maxCount: 1 }]), getGeneralImgById);
router.post("/removeimg", upload.fields([{ name: 'Header', maxCount: 1 }, { name: 'Photoshoot', maxCount: 1 }]), deleteGeneralImg);
// router.patch("/:id", upload.array('document'), updateDocument);
//router.get("/:id", upload.array('document'), getDocumentById);
// router.delete("/:id", upload.array('document'), deleteDocument);
// router.delete("/gerenal/:id", upload.array('document'), deleteDocumentById);

module.exports = {
    generalRoute: router,
};
