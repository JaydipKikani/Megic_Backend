const { Customer } = require("../../../models/customer");
const bcrypt = require("bcrypt");
const fs = require("fs");

const {
  requireFieldErrorMessage,
  getDuplicateErrorMessage,
} = require("../../../services/validation");
const { createToken } = require("../../../services/token");

const updateCustomer = async (req, res) => {
  const customerId = req.params.id; // Assuming the customer ID is in the request parameters
  const updatedData = req.body;
  const file = req.file;

  try {
    // Find the customer by ID
    const existingCustomer = await Customer.findById(customerId);

    if (!existingCustomer) {
      return res.status(404).json({
        status: false,
        error: true,
        msg: "Customer not found",
      });
    }

    // Check if the updated email already exists for another customer
    if (updatedData.email && updatedData.email !== existingCustomer.email) {
      const emailExists = await Customer.findOne({ email: updatedData.email });

      if (emailExists) {
        return res.status(422).json({
          status: false,
          error: true,
          msg: "Email already exists for another customer",
        });
      }
    }

    // Update customer data
    existingCustomer.firstname = updatedData.firstname || existingCustomer.firstname;
    existingCustomer.lastname = updatedData.lastname || existingCustomer.lastname;
    existingCustomer.email = updatedData.email || existingCustomer.email;
    existingCustomer.contact = updatedData.contact || existingCustomer.contact;
    existingCustomer.address = updatedData.address || existingCustomer.address;
    existingCustomer.city = updatedData.city || existingCustomer.city;
    existingCustomer.country = updatedData.country || existingCustomer.country;
    existingCustomer.vat_number = updatedData.vat_number || existingCustomer.vat_number;
    existingCustomer.role = updatedData.role || existingCustomer.role;

    // Handle password update separately
    if (updatedData.password) {
      const hashedPassword = await bcrypt.hash(updatedData.password, 10);
      existingCustomer.password = hashedPassword;
    }

    // Save the updated customer
    const updatedCustomer = await existingCustomer.save();

    // Handle file update if a new file is provided
    if (file) {
      const imgPath = `/assets/licence/${customerId}${file.filename}`;
      fs.rename(
        `./assets/licence/${file.filename}`,
        `./assets/licence/${customerId}${file.filename}`,
        (err) => {
          if (err) {
            // Handle error while renaming file
            console.log("Error handling file: " + err);
            return res.status(500).json({
              status: "error",
              error: err.message,
            });
          }
          updatedCustomer.licence = imgPath;
          updatedCustomer.save();
        }
      );
    }

    return res.status(200).json({
      status: true,
      error: false,
      msg: "Customer updated successfully.",
      data: {
        updatedCustomer,
      },
    });
  } catch (err) {
    if (file) {
      fs.unlink(`./assets/licence/${file.filename}`, (err) => {
        console.log("Deleting....");
        if (err) {
          console.log("Error while deleting file: " + err);
        } else {
          console.log("Successfully deleted file");
        }
      });
    }

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
      errors = requireFieldErrorMessage(err);
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
        msg: "Internal Server error",
      });
    }
  }
};

module.exports = updateCustomer;
