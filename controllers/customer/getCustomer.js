const { Customer, Driver } = require("../../models/customer");

const getCustomer = async (req, res) => {
  try {
    const customers = await Customer.find()
      .populate("driver_id", "driver_first driver_last")
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
    // Find the customer by _id
    const customer = await Customer.findById(id)
      .populate("comp_id", "name")
      .populate("sub_id", "subscription_name")
      .populate("driver_id"); // Populate the driver_id field

    if (!customer) {
      return res.status(404).json({
        status: false,
        error: true,
        msg: "Customer not found",
      });
    }

    // Retrieve the driver using the driver_id field
    const driver = await Driver.findById(customer.driver_id);

    // Combine the data from customer and driver
    const combinedData = {
      customer,
      driver,
    };

    return res.status(200).json({
      status: true,
      error: false,
      msg: "Customer and Driver details retrieved successfully",
      data: combinedData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      error: true,
      msg: "Internal Server Error",
    });
  }
};

module.exports = { getCustomer, getCustomerById };
