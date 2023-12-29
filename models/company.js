const mongoose = require("mongoose");

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
  accountname: String,
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

const miscSettingSchema = mongoose.Schema({
  admin_cost: String,
  add_cost: String,
  svarnish: String,
  lvarnish: String,
  redowheel: String,
  compid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
});

const companyInfo = mongoose.model("Company", compnayDetailsSchema, "Company");

const billingInformation = mongoose.model(
  "BillingInformation",
  billingInformationSchema,
  "BillingInformation"
);

const bankingInformation = mongoose.model(
  "BankingInformation",
  bankigInformationSchema,
  "BankingInformation"
);

const miscSetting = mongoose.model(
  "MiscSetting",
  miscSettingSchema,
  "MiscSetting"
);

module.exports = {
  companyInfo,
  billingInformation,
  bankingInformation,
  miscSetting,
};
