const mongoose = require('mongoose');

// Define schema for the Invoice
const invoiceSchema = new mongoose.Schema({
    company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    invoice_id: { type: String, required: true, unique: true },
    billing_date: { type: Date, required: true },
    due_date: { type: Date, required: true },
    subtotal_ex_vat: { type: Number, required: true },
    total_vat: { type: Number, required: true },
    total_in_vat: { type: Number, required: true },
    paid: { type: Number, default: 0 },
    refunded: { type: Number, default: 0 },
    total_pay: { type: Number, required: true },
    notes: { type: String },
    productDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductDetail' }]
},{timestamps:true});

const Invoice = mongoose.model('Invoice', invoiceSchema);

// Define schema for the ProductDetail
const productDetailSchema = new mongoose.Schema({
    bill_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice', required: true },
    item_name: { type: String, required: true },
    item_desc: { type: String },
    price: { type: Number, required: true },
    length: { type: Number },
    qty: { type: Number, required: true },
    p_vat: { type: Number },
    vat: { type: Number },
    total_ex_vat: { type: Number, required: true }
});

const ProductDetail = mongoose.model('ProductDetail', productDetailSchema);

module.exports = { Invoice, ProductDetail };
