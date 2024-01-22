const { Document } = require("../../models/vehicle");

const getDocumentById = async (req, res) => {
  try {
    const id = req.params.id;
    const document = await Document.find({ general_info: id }).select("-__v");

    if (!document) {
      return res.status(404).json({
        status: false,
        error: true,
        msg: "Document not found.",
      });
    }
    return res.status(200).json({
      status: true,
      error: false,
      msg: "Get Document List successfully",
      data: document,
    });
  } catch (error) {
    errors = requireFieldErrorMessege(err);
    return res.status(500).json({
      status: false,
      error: true,
      msg: error.message,
    });
  }
};

module.exports = {
  getDocumentById,
};
