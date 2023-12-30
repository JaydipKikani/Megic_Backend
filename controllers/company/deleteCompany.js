const {
  companyInfo,
  billingInformation,
  bankingInformation,
  miscSetting,
} = require("../../models/company");

const deleteCompany = async (req, res) => {
  const { id } = req.params;
  try {
    let company, billing, banking, misc;
    company = await companyInfo.findOneAndDelete({ _id: id });
    if (company !== null) {
      billing = await billingInformation.findOneAndDelete({
        compid: id,
      });
      banking = await bankingInformation.findOneAndDelete({
        compid: id,
      });
      misc = await miscSetting.findOneAndDelete({ compid: id });

      res.status(200).json({
        status: true,
        error: false,
        msg: "company deleted successfully.",
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
    res.status(404).json({
      status: false,
      error: true,
      msg: "company not found",
    });
  }
};

module.exports = {
  deleteCompany,
};
