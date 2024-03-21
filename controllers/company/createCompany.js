const {
  CompanyInfo,
  BankingInformation,
  BillingInformation,
} = require("../../models/company");
const {
  getDuplicateErrorMessage,
  requireFieldErrorMessege,
} = require("../../services/validation");

const createCompany = async (req, res) => {
  const { compnayDetails, billingInfo, bankingInfo, miscSett, ...extraKeys } =
    req.body;
  if (Object.keys(extraKeys).length > 0) {
    return res.status(400).json({
      status: false,
      error: true,
      msg: "Unexpected keys in request body.",
    });
  }
  try {
    let company, billing, banking, misc;

    // Create the CompanyInfo model, including the vatno, regno, and vate_rate fields
    company = await CompanyInfo.create({
      ...compnayDetails,
      vatno: compnayDetails.vatno,
      regno: compnayDetails.regno,
      vate_rate: compnayDetails.vate_rate,
    });

    if (billingInfo) {
      // Update the compid field for BillingInformation
      billing = await BillingInformation.create({
        ...billingInfo,
        compid: company._id,
      });
    }

    if (bankingInfo) {
      // Update the compid field for BankingInformation
      banking = await BankingInformation.create({
        ...bankingInfo,
        compid: company._id,
      });
    }

    // You may want to handle miscSett creation based on your schema

    return res.status(201).json({
      status: true,
      error: false,
      msg: "company created successfully.",
      data: {
        company,
        billing,
        banking,
        misc,
      },
    });
  } catch (err) {
    let errors = "";
    if (err.code === 11000 && err.keyPattern && err.keyValue) {
      const errorMessage = getDuplicateErrorMessage(err);
      errors = errorMessage;
      return res.status(422).json({
        status: false,
        error: true,
        msg: errors,
      });
    } else if (err.name === "ValidationError") {
      errors = requireFieldErrorMessege(err);
      return res.status(422).json({
        status: false,
        error: true,
        msg: errors,
      });
    } else {
      return res.status(500).json({
        status: false,
        error: true,
        msg: "Internal server error",
      });
    }
  }
};

module.exports = {
  createCompany,
};
