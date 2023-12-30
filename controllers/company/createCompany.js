const {
  companyInfo,
  billingInformation,
  bankingInformation,
  miscSetting,
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
    company = await companyInfo.create(compnayDetails);
    if (billingInfo) {
      billing = await billingInformation.create({
        ...billingInfo,
        compid: company._id,
      });
    }

    if (bankingInfo) {
      banking = await bankingInformation.create({
        ...bankingInfo,
        compid: company._id,
      });
    }
    if (miscSett) {
      misc = await miscSetting.create({
        ...miscSett,
        compid: company._id,
      });
    }

    res.status(201).json({
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
    } else {
      if (err.name === "ValidationError") {
        // Object.keys(err.errors).forEach((key) => {
        //   errors = err.errors[key].message;
        // });
        errors = requireFieldErrorMessege(err);
      }
    }
    res.status(500).json({
      status: false,
      error: true,
      msg: errors,
    });
  }
};

module.exports = {
  createCompany,
};
