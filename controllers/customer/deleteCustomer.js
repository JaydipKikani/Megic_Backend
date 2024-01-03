const Customer = require("../../models/customer");
const fs = require("fs");

const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCustomer = await Customer.findOneAndDelete({ _id: id });

    // Check if the customer was found and then construct the file path
    if (deletedCustomer !== null) {
      
      fs.unlink(`.${deletedCustomer?.licence}`, (err) => {
        console.log("deleteing....");
        if (err) {
          console.log("error while deleting file: " + err);
        } else {
          console.log("successfully deleted file");
        }
      });

      return res.status(200).json({
        status: true,
        error: false,
        msg: "Customer deleted successfully.",
        data: deletedCustomer,
      });

      // Check if the file exists before attempting to unlink it
    } else {
      return res.status(404).json({
        status: false,
        error: true,
        msg: "Customer not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: true,
      msg: "Internal Server error",
    });
  }
};

module.exports = deleteCustomer;
