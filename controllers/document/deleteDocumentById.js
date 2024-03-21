const { Document } = require("../../models/vehicle");
const fs = require("fs").promises;
const path = require("path");

const deleteDocumentById = async (req, res) => {
  try {
    const id = req.params.id;

    // Find all documents with the specified general_info ID
    const documents = await Document.find({ general_info: id });

    if (!documents || documents.length === 0) {
      return res.status(404).json({
        status: false,
        error: true,
        msg: "No documents found for the given general_info ID.",
      });
    }

    // Remove files from the folder for each document
    for (const doc of documents) {
      if (doc.document && doc.document.length > 0) {
        for (const fileUrl of doc.document) {
          const filePath = path.join(__dirname, "../../", fileUrl);
          await fs.unlink(filePath);
        }
      }

      // Remove the document from the database
      await Document.findByIdAndDelete(doc._id);
    }

    return res.status(201).json({
      status: true,
      error: false,
      msg: "Documents deleted successfully",
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
  deleteDocumentById,
};
