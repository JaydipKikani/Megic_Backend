const { CompanyInfo } = require("../../models/company");

const getCompanyList = async (req, res) => {
  try {
    const company = await CompanyInfo.find().select("name _id");
    res.status(200).json({
      status: true,
      error: false,
      msg: "company information gets successfully",
      data: company,
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
  getCompanyList,
};
