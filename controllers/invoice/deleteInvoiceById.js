const { Invoice, ProductDetail } = require("../../models/invoice");

const deleteInvoiceById = async (req, res) => {
    try {
        const invoiceId = req.params.id;

        // Find and delete the Invoice along with its ProductDetails
        const deletedInvoice = await Invoice.findOneAndDelete({ _id: invoiceId });

        // Delete associated ProductDetails
        await ProductDetail.deleteMany({ bill_id: invoiceId });

        if (!deletedInvoice) {
            return res.status(404).json({
                status: false,
                error: true,
                msg: 'Invoice not found',
            });
        }

        return res.json({
            status: true,
            error: false,
            msg: 'Invoice and associated ProductDetails deleted successfully',
            data: deletedInvoice,
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
    
    deleteInvoiceById
};
