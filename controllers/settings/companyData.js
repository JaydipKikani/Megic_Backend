const { CompanyInfo } = require("../../models/company");

const companyData = async (req, res) => {
  try {
    const companiesWithSubscriptions = await CompanyInfo.aggregate([
      {
        $lookup: {
          from: "Subscriptions",
          localField: "_id",
          foreignField: "comp_id",
          as: "subscriptions",
        },
      },
      {
        $project: {
          name: 1,
          _id: {
            $toString: "$_id",
          },
          subscriptions: {
            $map: {
              input: "$subscriptions",
              as: "sub",
              in: {
                sub_name: "$$sub.subscription_name",
                sub_id: { $toString: "$$sub._id" },
              },
            },
          },
        },
      },
    ]);

    res.status(200).json({
      status: true,
      error: false,
      msg: "company information gets successfully",
      data: companiesWithSubscriptions,
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
  companyData,
};
