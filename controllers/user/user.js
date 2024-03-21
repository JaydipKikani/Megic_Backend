const User = require("../../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createToken } = require("../../services/token");

const checkUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: false,
        error: true,
        msg: 'Invalid email or password.',
      });
    }
    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: false,
        error: true,
        msg: 'Invalid email or password.',
      });
    }


    const token = createToken({ userId: user._id, email: user.email });
    // Build the response data
    const responseData = {
      _id: user._id.toString(),
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      company: user.company,
      company_vat: user.company_vat,
      phone_no: user.phone_no,
      address: user.address,
      state: user.state,
      zipcode: user.zipcode,
      country: user.country,
      language: user.language,
      role: user.role,
      token,
    };

    if (user.profilePhoto) {
      responseData.profilePhoto = user.profilePhoto;
    }

    res.status(200).json({
      status: true,
      error: false,
      msg: 'Login successful.',
      data: responseData,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: true,
      msg: error.message,
    });
  }
};

module.exports = {
  checkUser,
};
