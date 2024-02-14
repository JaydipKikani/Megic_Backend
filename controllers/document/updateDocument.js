const fs = require("fs").promises;
const path = require("path");
const { Document } = require("../../models/vehicle");

const updateDocument = async (req, res) => {
  try {
    const id = req.params.id;
    // Find documents with the specified general_info ID
    const documents = await Document.find({ general_info: id });

    if (!documents || documents.length === 0) {
      return res.status(404).json({
        status: false,
        error: true,
        msg: "No documents found for the given general_info ID.",
      });
    }

    // Remove files from the folder for each existing document
    for (const doc of documents) {
      if (doc.document && doc.document.length > 0) {
        for (const fileUrl of doc.document) {
          const filePath = path.join(
            __dirname,
            "../../assets/document",
            path.basename(fileUrl)
          );
          await fs.unlink(filePath);
        }
      }

      // Remove the existing Document document
      await Document.findByIdAndDelete(doc._id);
    }

    // Upload the new documents
    const files = req.files;
    if (files && files.length > 0) {
      const newDocuments = [];

      for (const file of files) {
        const newFileUrl = `/assets/document/${file.filename}`;

        // Save the new document
        const newDocument = await Document.create({
          general_info: id,
          document: [newFileUrl],
        });

        // Fetch the saved document with limited fields
        const responseDocument = {
          _id: newDocument._id,
          general_info: newDocument.general_info,
          document: newDocument.document,
        };

        newDocuments.push(responseDocument);
      }

      return res.json({
        status: true,
        error: false,
        msg: "Document(s) updated successfully",
        data: newDocuments,
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
