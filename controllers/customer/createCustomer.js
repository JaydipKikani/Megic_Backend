const Customer = require("../../models/customer");

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

module.exports = createCustomer;
