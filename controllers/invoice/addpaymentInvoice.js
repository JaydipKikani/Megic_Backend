const { Invoice, InvoicePayment } = require("../../models/invoice");
const moment = require('moment');

const addpaymentInvoice = async (req, res) => {
    try {
        const { invoice_id, amount, pay_date, pay_method, internal_payment_notes } = req.body;
        const invoice = await Invoice.findById(invoice_id);

        if (!invoice) {
            return res.status(404).json({
                status: false,
                error: true,
                msg: 'Invoice not found'
            });
        }

        // Check if the invoice is already paid in full
        if (invoice.paid >= invoice.total_pay) {
            return res.status(400).json({
                status: false,
                error: true,
                msg: 'Invoice is already paid in full'
            });
        }

        // Calculate the remaining amount to be paid
        const remainingAmount = invoice.total_pay - invoice.paid;

        // Check if the payment amount is valid
        if (amount > remainingAmount) {
            return res.status(400).json({
                status: false,
                error: true,
                msg: 'Payment amount exceeds the remaining amount to be paid'
            });
        }

        let payment = await InvoicePayment.findOne({ invoice_id });

        // Fetch the current paid value from the database
        const oldPaidAmount = invoice.paid;

        // If the payment record exists, update it
        if (payment) {
            // Deduct the previous payment amount from the current invoice paid amount
            invoice.paid -= payment.amount;

            // Update the payment record
            payment.amount = amount;
            payment.pay_date = moment(pay_date, 'DD-MM-YYYY').toDate(); // Parse date with moment
            payment.pay_method = pay_method;
            payment.internal_payment_notes = internal_payment_notes;
            payment.updated_date = Date.now();

            // Save the updated payment record
            await payment.save();
        } else {
            // If the payment record doesn't exist, create a new one
            payment = new InvoicePayment({
                invoice_id,
                amount,
                pay_date: moment(pay_date, 'DD-MM-YYYY').toDate(), // Parse date with moment
                pay_method,
                internal_payment_notes,
            });

            // Save the new payment record
            await payment.save();
        }

        // Calculate the new paid amount by adding the old paid amount and the new payment amount
        const newPaidAmount = oldPaidAmount + Number(amount);

        // Update the paid amount in the invoice
        invoice.paid = newPaidAmount;

        // Set the status based on the new paid amount
        invoice.status = newPaidAmount >= invoice.total_pay ? 1 : 0;

        // Save the updated invoice
        await invoice.save();

        return res.status(201).json({
            status: true,
            error: false,
            msg: 'Payment added/updated successfully'
        });

    } catch (error) {
        console.error("Error in addpaymentInvoice:", error);
        return res.status(500).json({
            status: false,
            error: true,
            msg: 'Internal server error'
        });
    }
};

module.exports = {
    addpaymentInvoice
};
