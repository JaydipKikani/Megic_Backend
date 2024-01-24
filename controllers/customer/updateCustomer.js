const { Customer, Driver } = require("../../models/customer");
const {
  getDuplicateErrorMessage,
  requireFieldErrorMessege,
} = require("../../services/validation");
const fs = require("fs");

const updateCustomer = async (req, res) => {
  const id = req.params.id;
  const customerData = req.body;
  const {
    driver_first,
    driver_last,
    driver_postcode,
    driver_address,
    driver_city,
    driver_country,
    driver_phone,
    driver_email,
    driver_dob,
  } = customerData;
  const file = req.file;

  try {
    const findCustomer = await Customer.findById(id);

    if (findCustomer !== null) {
      // Update the customer
      const updatedCustomer = await Customer.findByIdAndUpdate(id, customerData, {
        new: true,
      });

      // Find the corresponding driver using the cust_id
      let updateDriver = await Driver.findOne({ cust_id: id });

      if (updateDriver) {
        // If driver exists, update its fields
        updateDriver.driver_first = driver_first;
        updateDriver.driver_last = driver_last;
        updateDriver.driver_postcode = driver_postcode;
        updateDriver.driver_address = driver_address;
        updateDriver.driver_city = driver_city;
        updateDriver.driver_country = driver_country;
        updateDriver.driver_phone = driver_phone;
        updateDriver.driver_email = driver_email;
        updateDriver.driver_dob = driver_dob;

        updateDriver = await updateDriver.save();
      } else {
        // If driver does not exist, create a new one
        updateDriver = await Driver.create({
          cust_id: id,
          driver_first,
          driver_last,
          driver_postcode,
          driver_address,
          driver_city,
          driver_country,
          driver_phone,
          driver_email,
          driver_dob,
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
    