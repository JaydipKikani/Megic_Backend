const Customer = require("../models/customer");
const fs = require("fs");
const path = require("path");

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

const createCustomer = async (req, res) => {
  const customer = req.body;

  try {
    const newCustomer = await Customer.create({
      firstName: customer.firstName,
      name: customer.name,
      email: customer.email,
      contact: customer.contact,
      member: customer.member,
    });

    res.status(201).json({
      status: "success",
      id: newCustomer._id,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      error: err,
    });
  }
};

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

module.exports = {
  createCustomer,
  deleteCustomer,
  updateCustomer,
  getCustomer,
};
