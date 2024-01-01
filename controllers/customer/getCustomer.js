const Customer = require("../../models/customer");

const getCustomer = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({
      status: "success",
      customers: customers,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      error: err,
    });
  }
};

module.exports = getCustomer;
