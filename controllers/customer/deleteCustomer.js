const Customer = require("../../models/customer");

const deleteCustomer = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      id: deletedCustomer._id,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      error: err,
    });
  }
};

module.exports = deleteCustomer;
