const {
  CompanyInfo,
  BillingInformation,
  BankingInformation,
} = require("../../models/company");
const { MiscSetting } = require("../../models/subscription");

const getCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await CompanyInfo.findOne({ _id: id });
    const billing = await BillingInformation.findOne({ compid: id });
    const banking = await BankingInformation.findOne({ compid: id });
    res.status(200).json({
      status: true,
      error: false,
      msg: "company information gets successfully",
      data: {
        company,
        billing,
        banking,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: false,
      error: true,
      msg: "company is not found",
    });
  }
};

module.exports = {
  getCompany,
};
