const { Customer, Driver } = require("../../models/customer");
const {
  getDuplicateErrorMessage,
  requireFieldErrorMessege,
} = require("../../services/validation");
const fs = require("fs");

const updateCustomer = async (req, res) => {
  const id = req.params.id;
  const customer = req.body;
  const file = req.file;

  try {
    const findCustomer = await Customer.findById(id);

    if (findCustomer !== null) {
      const updatedCustomer = await Customer.findByIdAndUpdate(id, customer, {
        new: true,
      });
      const updateDriver = await Driver.findOneAndUpdate(
        { cust_id: id },
        customer,
        {
          new: true,
        }
      );

      if (req.file) {
        fs.rename(
          `./assets/licence/${file.filename}`,
          `./assets/licence/${updatedCustomer._id}${file.filename}`,
          (err) => {
            if (err) {
              // Handle error while renaming file
              console.log("error updating file: " + err);
              return res.status(500).json({
                status: false,
                error: true,
                msg: "error while updating file file",
              }); // Exit function early if file handling fails
            }
          }
        );
      }
      return res.status(200).json({
        status: true,
        error: false,
        msg: "customer updated successfully.",
        data: {
          customer: updatedCustomer,
          driver: updateDriver,
        },
      });
    } else {
      return res.status(404).json({
        status: false,
        error: true,
        msg: "customer not found",
      });
    }
  } catch (err) {
    console.log(err);
    let errors = "";
    if (err.code === 11000 && err.keyPattern && err.keyValue) {
      const errorMessage = getDuplicateErrorMessage(err);
      errors = errorMessage;
      return res.status(422).json({
        status: false,
        error: true,
        msg: errors,
      });
    } else if (err.name === "ValidationError") {
      errors = requireFieldErrorMessege(err);
      return res.status(422).json({
        status: false,
        error: true,
        msg: errors,
      });
    } else {
      console.log(err);
      return res.status(500).json({
        status: false,
        error: true,
        msg: "Internal server error",
      });
    }
  }
};

module.exports = {
  updateCustomer,
};
