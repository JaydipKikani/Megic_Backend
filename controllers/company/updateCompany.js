const {
  CompanyInfo,
  BillingInformation,
  BankingInformation,
} = require("../../models/company");
const { MiscSetting } = require("../../models/subscription");
const {
  getDuplicateErrorMessage,
  requireFieldErrorMessege,
} = require("../../services/validation");

const updateCompany = async (req, res) => {
  const { id } = req.params;
  const { compnayDetails, billingInfo, bankingInfo, ...extraKeys } = req.body;
  if (Object.keys(extraKeys).length > 0) {
    return res.status(400).json({
      status: false,
      error: true,
      msg: "Unexpected keys in request body.",
    });
  }

  try {
    let company, billing, banking, misc;

    const getCompany = await CompanyInfo.findById(id);

    if (getCompany !== null) {
      company = await CompanyInfo.findOneAndUpdate(
        { _id: id },
        compnayDetails,
        {
          new: true,
        }
      );
      if (billingInfo) {
        billing = await BillingInformation.findOneAndUpdate(
          { compid: id },
          billingInfo,
          { new: true }
        );
      }
      if (bankingInfo) {
        banking = await BankingInformation.findOneAndUpdate(
          { compid: id },
          bankingInfo,
          { new: true }
        );
      }
      res.status(200).json({
        status: true,
        error: false,
        msg: "company details updated successfully.",
        data: {
          company,
          billing,
          banking,
          misc,
        },
      });
    } else {
      res.status(404).json({
        status: false,
        error: true,
        msg: "company not found",
      });
    }
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
  updateCompany,
};
