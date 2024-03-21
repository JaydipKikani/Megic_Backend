const { Invoice, Company, Customer } = require("../../models/invoice");

const getInvoicelist = async (req, res) => {
    try {
        const invoices = await Invoice.find()
            .select('_id invoice_id total_pay billing_date due_date payment_status company_id customer_id status')
            .populate({
                path: 'company_id',
                select: 'name', // Include the fields you want from the Customer model
            })
            .populate({
                path: 'customer_id',
                select: 'firstname lastname email', // Include the fields you want from the Customer model
            });

        const formattedInvoices = invoices.map(invoice => ({
            _id: invoice._id,
            invoice_id: invoice.invoice_id,
            total_pay: invoice.total_pay,
            billing_date: invoice.billing_date,
            due_date: invoice.due_date,
            payment_status: invoice.payment_status,
            company: invoice.company_id,
            customer: invoice.customer_id,
            status: invoice.status,
        }));
        return res.json({
            status: true,
            error: false,
            msg: 'Get List of Invoices Successfully',
            data: formattedInvoices,
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
    getInvoicelist
};
