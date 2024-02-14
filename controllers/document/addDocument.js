const { Document } = require("../../models/vehicle");
const { requireFieldErrorMessege } = require("../../services/validation");

const addDocument = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(404).json({
        status: false,
        error: true,
        msg: "No files were uploaded.",
      });
    }

    const generalInfoId = req.body.general_info;

    const documents = [];
    
    for (const file of files) {
      const fileUrl = `/assets/document/${file.filename}`;

      const document = new Document({
        general_info: generalInfoId,
        document: [fileUrl],
      });

      const savedDocument = await document.save();

      // Fetch the saved document with limited fields
      const responseDocument = {
        _id: savedDocument._id,
        general_info: savedDocument.general_info,
        document: savedDocument.document,
      };

      documents.push(responseDocument);
    }

    return res.status(200).json({
      status: true,
      error: false,
      msg: "Files uploaded successfully",
      data: documents,
    });
  } catch (err) {
    let errors;
    errors = requireFieldErrorMessege(err);
    return res.status(500).json({
      status: false,
      error: true,
      msg: err.message,
    });
  }
};

module.exports = {
  addDocument,
};
