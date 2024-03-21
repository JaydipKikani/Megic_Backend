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

    // Get the document folder path (assuming it's stored in a specific directory)
    const documentFolderPath = path.join(__dirname, "../../", "assets/document", id);

    // Check if the document folder exists
    const folderExists = await fs.stat(documentFolderPath).catch(() => false);

    if (folderExists) {
      // If the folder exists, delete it recursively
      await fs.rmdir(documentFolderPath, { recursive: true });
    }

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
