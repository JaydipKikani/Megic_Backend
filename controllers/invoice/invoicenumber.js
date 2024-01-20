const { Invoice, Company, Customer } = require("../../models/invoice");

const invoiceNumber = async (req, res) => {
    try {
        const lastInvoice = await Invoice.findOne().sort({ invoice_id: -1 }).lean().exec();

        let nextInvoiceId;

        if (lastInvoice) {
            const lastInvoiceNumber = parseInt(lastInvoice.invoice_id.slice(-3)); // Extract the last 3 characters
            const nextInvoiceNumber = lastInvoiceNumber + 1;
            nextInvoiceId = `2024${nextInvoiceNumber.toString().padStart(3, '0')}`;
        } else {
            nextInvoiceId = '2024001';
        }

        return res.json({
            status: true,
            error: false,
            msg: 'Get List of Invoices Successfully',
            data: nextInvoiceId,
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
    invoiceNumber
};
