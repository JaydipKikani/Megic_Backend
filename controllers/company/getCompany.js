const {
  companyInfo,
  billingInformation,
  bankingInformation,
  miscSetting,
} = require("../../models/company");

const getCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await companyInfo.findOne({ _id: id });
    const billing = await billingInformation.findOne({ compid: id });
    const banking = await bankingInformation.findOne({ compid: id });
    const misc = await miscSetting.findOne({ compid: id });
    res.status(200).json({
      status: true,
      error: false,
      msg: "company information gets successfully",
      data: {
        company,
        billing,
        banking,
        misc,
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
