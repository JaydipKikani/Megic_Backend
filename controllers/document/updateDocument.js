const fs = require("fs").promises;
const path = require("path");
const { Document } = require("../../models/vehicle");

const updateDocument = async (req, res) => {
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

    // Remove files from the folder
    if (document.document && document.document.length > 0) {
      for (const fileUrl of document.document) {
        const filePath = path.join(
          __dirname,
          "../../assets/document",
          path.basename(fileUrl)
        );
        await fs.unlink(filePath);
      }
    }

    // Remove the existing Document document
    await Document.findByIdAndDelete(id);

    // Upload the new documents
    const files = req.files;
    if (files && files.length > 0) {
      const newFileUrls = files.map(
        (file) => `/assets/document/${file.filename}`
      );

      // Save the new documents
      const newDocument = await Document.create({
        general_info: document.general_info,
        document: newFileUrls,
      });

      return res.json({
        status: true,
        error: false,
        msg: "Document updated successfully",
        data: newDocument,
      });
    } else {
      return res.json({
        status: false,
        error: true,
        msg: "No new documents provided.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: true,
      msg: error.message,
    });
  }
};

module.exports = {
  updateDocument,
};
