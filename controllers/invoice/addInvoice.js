const { Invoice, ProductDetail } = require("../../models/invoice");

const addInvoice = async (req, res) => {
    try {
        const { productDetails, ...invoiceData } = req.body;

        // Create a new invoice
        const newInvoice = new Invoice(invoiceData);
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
