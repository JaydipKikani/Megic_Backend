const Customer = require("../../models/customer");

const getCustomer = async (req, res) => {
  try {
    const customers = await Customer.aggregate([
      {
        $project: {
          _id: 1,
          firstname: 1,
          lastname: 1,
          cust_type: 1,
          email: 1,
          city: 1,
          country: 1,
          comp_id: 1,
          sub_id: 1,
        },
      },
      {
        $lookup: {
          from: "Company", // Assuming the name of the company collection is 'companies'
          localField: "comp_id",
          foreignField: "_id",
          as: "companyInfo",
        },
      },
      {
        $lookup: {
          from: "Subscriptions", // Assuming the name of the subscription collection is 'subscriptions'
          localField: "sub_id",
          foreignField: "_id",
          as: "subscriptionInfo",
        },
      },
      {
        $unwind: {
          path: "$companyInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$subscriptionInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          firstname: 1,
          lastname: 1,
          cust_type: 1,
          email: 1,
          city: 1,
          country: 1,
          company_name: "$companyInfo.name",
          subscription_name: "$subscriptionInfo.subscription_name",
        },
      },
    ]);

    return res.status(200).json({
      status: true,
      error: false,
      msg: "customer information gets successfully",
      data: customers,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: true,
      msg: "Internal Server error",
    });
  }
};

const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findById(id);
    if (customer !== null) {
      return res.status(200).json({
        status: true,
        error: false,
        msg: "customer information gets successfully",
        data: customer,
      });
    } else {
      return res.status(404).json({
        status: false,
        error: true,
        msg: "customer is not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      error: true,
      msg: "Internal Server error",
    });
  }
};

module.exports = { getCustomer, getCustomerById };
