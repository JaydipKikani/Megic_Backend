const { Customer } = require("../../models/customer");

const getCustomer = async (req, res) => {
  try {
    const customers = await Customer.find()
      .populate("comp_id", "name")
      .populate("sub_id", "subscription_name");

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
    const customer = await Customer.findById(id).populate("comp_id", "name");

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
