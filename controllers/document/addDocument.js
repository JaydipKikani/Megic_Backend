const { Document } = require("../../models/vehicle");

const addDocument = async (req, res) => {
    try {
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(404).json({
                status: false,
                error: true,
                msg: 'No files were uploaded.',
            });
        }

        const fileUrls = files.map(file => `/assets/document/${file.filename}`);
        const generalInfoId = req.body.general_info;

        const document = new Document({ general_info: generalInfoId, document: fileUrls });
        const savedDocument = await document.save();

        // Fetch the saved document with limited fields
        const responseDocument = await Document.findById(savedDocument._id).select('general_info document _id');

        
        return res.status(422).json({
            status: false,
            error: true,
            msg: 'Files uploaded successfully',
            data: responseDocument,
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
    addDocument,
};