const {
  companyInfo,
  billingInformation,
  bankingInformation,
  miscSetting,
} = require("../../models/company");
const { getDuplicateErrorMessage } = require("../../services/validation");

const updateCompany = async (req, res) => {
  const { id } = req.params;
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
    

    company = await companyInfo.findOneAndUpdate({ _id: id }, compnayDetails, {
      new: true,
    });
    if (billingInfo) {
      billing = await billingInformation.findOneAndUpdate(
        { compid: id },
        billingInfo,
        { new: true }
      );
    }
    if (bankingInfo) {
      banking = await bankingInformation.findOneAndUpdate(
        { compid: id },
        bankingInfo,
        { new: true }
      );
    }
    if (miscSett) {
      misc = await miscSetting.findOneAndUpdate({ compid: id }, miscSett, {
        new: true,
      });
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
  } catch (err) {
    let errors = "";
    if (err.code === 11000 && err.keyPattern && err.keyValue) {
      const errorMessage = getDuplicateErrorMessage(err);
      errors = errorMessage;
      res.status(500).json({
        status: false,
        error: true,
        msg: errors,
      });
    } else {
      res.status(404).json({
        status: false,
        error: true,
        msg: "company not found",
      });
    }
  }
};

module.exports = {
  updateCompany,
};
