const Customer = require("../../models/customer");

const updateCustomer = async (req, res) => {
  const id = req.params.id;
  const customer = req.body;
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(id, customer, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      id: updatedCustomer._id,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      error: err,
    });
  }
};

module.exports = {
  updateCustomer,
};
