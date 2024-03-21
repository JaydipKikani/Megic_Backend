const { Customer } = require("../../../models/customer");
const bcrypt = require("bcrypt");
const { createToken } = require("../../../services/token");

const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the customer by email
    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(401).json({
        status: false,
        error: true,
        msg: "Invalid email or password",
      });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, customer.password);

    if (!passwordMatch) {
      return res.status(401).json({
        status: false,
        error: true,
        msg: "Invalid email or password",
      });
    }

    const token = createToken({ customId: customer._id, email: customer.email });

    // Customize the data you want to include in the response
    const responseData = {
      _id: customer._id,
      firstname: customer.firstname,
      lastname: customer.lastname,
      email: customer.email,
      role: customer.role,
      contact: customer.contact,
      postal_code: customer.postal_code,
      address: customer.address,
      city: customer.city,
      country: customer.country,
      vat_number: customer.vat_number,
      token
    };

    return res.status(200).json({
      status: true,
      error: false,
      msg: "Login successful",
      data: responseData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      error: true,
      msg: "Internal server error",
    });
  }
};

module.exports = {
  loginCustomer,
};
