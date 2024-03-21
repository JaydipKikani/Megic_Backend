const mongoose = require("mongoose");

// Define schema for the Invoice
const invoiceSchema = new mongoose.Schema(
  {
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    general_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "General",
      required: true,
    },
    invoice_id: { type: String, required: true, unique: true },
    billing_date: { type: Date, required: true },
    due_date: { type: Date, required: true },
    subtotal_ex_vat: { type: Number, required: true },
    total_vat: { type: Number, required: true },
    total_in_vat: { type: Number, required: true },
    paid: { type: Number, default: 0 },
    refunded: { type: Number, default: 0 },
    status: { type: Number, default: 0 }, // 0-NotPaid 1-Paid
    discount: { type: Number, default: 0 },
    discount_per: { type: String },
    total_pay: { type: Number, required: true },
    notes: { type: String },
    productDetails: [
      { type: mongoose.Schema.Types.ObjectId, ref: "ProductDetail" },
    ],
    proformate: { type: Boolean },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

// Define schema for the ProductDetail
const productDetailSchema = new mongoose.Schema({
  bill_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invoice",
    required: true,
  },
  item_name: { type: String, required: true },
  price: { type: Number },
  length: { type: Number },
  qty: { type: Number, required: true },
  p_vat: { type: Number },
  period: { type: String },
  vat: { type: Number },
  total_ex_vat: { type: Number, required: true },
});

const ProductDetail = mongoose.model("ProductDetail", productDetailSchema);


const invoicePaymentSchema = new mongoose.Schema(
  {
    invoice_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
    },
    amount: { type: Number, required: true },
    pay_date: { type: Date, required: true },
    pay_method: { type: String, required: true },
    internal_payment_notes: { type: String },
  },
  { timestamps: true }
);

const InvoicePayment = mongoose.model("InvoicePayment", invoicePaymentSchema);

module.exports = { Invoice, ProductDetail, InvoicePayment };