const mongoose = require("mongoose");
// Company API
const compnayDetailsSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
  },
  website: {
    type: String,
  },
});

const billingInformationSchema = mongoose.Schema({
  legalname: String,
  country: String,
  street: String,
  city: String,
  number: String,
  province: String,
  compid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  postal: {
    type: String,
    min: 6,
  },
});

const bankigInformationSchema = mongoose.Schema({
  bankname: String,
  vatno: String,
  iban: String,
  bic: String,
  regno: String,
  vate_rate: String,
  currency: String,
  symbol: String,
  compid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
});

const CompanyInfo = mongoose.model("Company", compnayDetailsSchema, "Company");

const BillingInformation = mongoose.model(
  "BillingInformation",
  billingInformationSchema,
  "BillingInformation"
);

const BankingInformation = mongoose.model(
  "BankingInformation",
  bankigInformationSchema,
  "BankingInformation"
);

module.exports = {
  CompanyInfo,
  BillingInformation,
  BankingInformation,
};
