const { Document } = require("../../models/vehicle");
const fs = require("fs").promises;
const path = require("path");

const deleteDocument = async (req, res) => {
  try {
    const id = req.params.id;

    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({
        status: false,
        error: true,
        msg: "Document not found.",
      });
    }

    // Remove the file from the folder
    const fileUrls = document.document;
    fileUrls.forEach(async (fileUrl) => {
      const filePath = path.join(__dirname, "../../", fileUrl);
      await fs.unlink(filePath);
    })  ;

    // Remove the document from the database
    await Document.findByIdAndDelete(id);

    return res.status(201).json({
      status: true,
      error: false,
      msg: "Document deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: true,
      msg: error.message,
    });
  }
};

module.exports = {
  deleteDocument,
};
