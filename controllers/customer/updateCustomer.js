const { Customer, Driver } = require("../../models/customer");
const {
  getDuplicateErrorMessage,
  requireFieldErrorMessege,
} = require("../../services/validation");
const fs = require("fs");

const updateCustomer = async (req, res) => {
  const customerId = req.params.id;
  const customerData = req.body;
  const file = req.file;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      customerData,
      { new: true }
    );

    if (updatedCustomer) {
      // Find the corresponding driver using the driver_id
      let updateDriver = await Driver.findById(updatedCustomer.driver_id);

      if (updateDriver) {
        // If driver exists, update its fields
        updateDriver = Object.assign(updateDriver, {
          driver_first: customerData.driver_first,
          driver_last: customerData.driver_last,
          driver_postcode: customerData.driver_postcode,
          driver_address: customerData.driver_address,
          driver_city: customerData.driver_city,
          driver_country: customerData.driver_country,
          driver_phone: customerData.driver_phone,
          driver_email: customerData.driver_email,
          driver_dob: customerData.driver_dob,
        });

        updateDriver = await updateDriver.save();
      } else {
        // If driver does not exist, create a new one
        updateDriver = await Driver.create({
          _id: updatedCustomer.driver_id,
          driver_first: customerData.driver_first,
          driver_last: customerData.driver_last,
          driver_postcode: customerData.driver_postcode,
          driver_address: customerData.driver_address,
          driver_city: customerData.driver_city,
          driver_country: customerData.driver_country,
          driver_phone: customerData.driver_phone,
          driver_email: customerData.driver_email,
          driver_dob: customerData.driver_dob,
        });
      }

      if (file) {
        // Update the file name based on the customer _id
        fs.rename(
          `./assets/licence/${file.filename}`,
          `./assets/licence/${updatedCustomer._id}${file.filename}`,
          (err) => {
            if (err) {
              console.log("error updating file: " + err);
              return res.status(500).json({
                status: false,
                error: true,
                msg: "Error while updating file",
              });
            }
          }
        );
      }

      return res.status(200).json({
        status: true,
        error: false,
        msg: "Customer and driver updated successfully.",
        data: {
          customer: updatedCustomer,
          driver: updateDriver,
        },
      });
    } else {
      return res.status(404).json({
        status: false,
        error: true,
        msg: "Customer not found",
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
