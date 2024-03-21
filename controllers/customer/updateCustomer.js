const { Customer, Driver } = require("../../models/customer");
const {
  getDuplicateErrorMessage,
  requireFieldErrorMessege,
} = require("../../services/validation");
const fs = require("fs");
const bcrypt = require("bcrypt");

const updateCustomer = async (req, res) => {
  const customerId = req.params.id;
  const customerData = req.body;
  const file = req.file;

  try {
    customerData.comp_id = customerData.comp_id || null;
    customerData.sub_id = customerData.sub_id || null;

    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      customerData,
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({
        status: false,
        error: true,
        msg: "Customer not found",
      });
    }

    let updateDriver = null;

    if (!updatedCustomer.driver_id) {
      // If driver_id is not present, create a new driver
      updateDriver = await Driver.create({
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

      // Update the customer with the newly created driver_id
      updatedCustomer.driver_id = updateDriver._id;
      await updatedCustomer.save();
    } else {
      // Find the corresponding driver using the driver_id
      updateDriver = await Driver.findById(updatedCustomer.driver_id);

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
      }
    }

    if (customerData.password) {
      const hashedPassword = await bcrypt.hash(customerData.password, 10);
      updatedCustomer.password = hashedPassword;
      await updatedCustomer.save();
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
