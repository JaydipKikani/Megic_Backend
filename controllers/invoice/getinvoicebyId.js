const { Invoice, ProductDetail } = require("../../models/invoice");

const getInvoiceById = async (req, res) => {
    try {
        const invoiceId = req.params.id;

        const invoice = await Invoice
            .findById(invoiceId)
            .populate('company_id')
            .populate('customer_id')
            .populate('productDetails');


        if (!invoice) {
            return res.status(404).json({
                status: false,
                error: true,
                msg: 'Invoice not found',
            });
        }

        // You can also include the separately queried productDetails
        const productDetails = await ProductDetail.find({ bill_id: invoice._id });

        const responseData = {
            invoice,
            ...(productDetails.length > 0 && { productDetails }),
        };

        return res.json({
            status: true,
            error: false,
            msg: 'Get Invoice with Details Successfully',
            data: responseData,
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
    getInvoiceById
};
