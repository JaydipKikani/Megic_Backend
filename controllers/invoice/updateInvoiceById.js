const { Invoice, ProductDetail } = require("../../models/invoice");

const updateInvoiceById = async (req, res) => {
    try {
        const invoiceId = req.params.id;

        const { productDetails, ...updatedInvoiceData } = req.body;

        // Check if the invoice with the specified ID exists
        const existingInvoice = await Invoice.findById(invoiceId).populate('productDetails');
        if (!existingInvoice) {
            return res.status(404).json({
                status: false,
                error: true,
                msg: 'Invoice not found',
            });
        }

        // Update the Invoice
        const updatedInvoice = await Invoice.findByIdAndUpdate(
            invoiceId,
            { $set: updatedInvoiceData },
            { new: true }
        );

        // If productDetails are provided, update or insert them
        if (productDetails && Array.isArray(productDetails) && productDetails.length > 0) {
            const productDetailsWithBillId = productDetails.map(detail => ({
                bill_id: updatedInvoice._id,
                ...detail
            }));

            // Delete existing ProductDetails for the invoice
            await ProductDetail.deleteMany({ bill_id: updatedInvoice._id });

            // Insert the updated ProductDetails
            await ProductDetail.insertMany(productDetailsWithBillId);
        }

        // You can also include the separately queried productDetails
        const productDetailData = await ProductDetail.find({ bill_id: invoiceId });

        const responseData = {
            invoice: updatedInvoice,
            ...(productDetails.length > 0 && { productDetailData }),
        };


        return res.json({
            status: true,
            error: false,
            msg: 'Invoice and associated ProductDetails updated successfully',
            data: responseData,
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            status: false,
            error: true,
            msg: error.message,
        });
    }
};

module.exports = {
    updateInvoiceById
};
