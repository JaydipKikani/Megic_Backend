const { Invoice, ProductDetail } = require("../../models/invoice");
const { requireFieldErrorMessege } = require("../../services/validation");

const addInvoice = async (req, res) => {
    try {
        const { productDetails, ...invoiceData } = req.body;

        // Create a new invoice
        const newInvoice = new Invoice(invoiceData);

        try {
            // Try saving the new invoice
            const savedInvoice = await newInvoice.save();

            // If productDetails are provided and is an array, associate them with the invoice
            if (Array.isArray(productDetails) && productDetails.length > 0) {
                const productDetailsWithBillId = productDetails.map(detail => ({
                    bill_id: savedInvoice._id,
                    ...detail
                }));
                await ProductDetail.insertMany(productDetailsWithBillId);
            } else if (productDetails) {
                console.warn('Product details should be an array.');
            }

            // Fetch the product details associated with the saved invoice
            const savedInvoiceWithDetails = await Invoice
                .findById(savedInvoice._id)
                .populate('productDetails')
                .lean();

            return res.json({
                status: true,
                error: false,
                msg: 'Invoice created successfully',
                data: savedInvoiceWithDetails || savedInvoice.toObject(),
            });
        } catch (error) {
            // Handle specific error cases
            if (error.name === 'MongoError' && error.code === 11000) {
                // Duplicate key error (e.g., duplicate invoice number)
                return res.status(422).json({
                    status: false,
                    error: true,
                    msg: 'Invoice number must be unique',
                });
            } else if (error.name === 'ValidationError') {
                // Handle validation errors (required fields)
                const validationErrors = requireFieldErrorMessege(error);
                return res.status(422).json({
                    status: false,
                    error: true,
                    msg: validationErrors,
                    // errors: validationErrors,
                });
            } else {
                // Other error cases
                return res.status(500).json({
                    status: false,
                    error: true,
                    msg: 'Invoice number already exists or something went wrong',
                });
            }
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
    addInvoice
};
