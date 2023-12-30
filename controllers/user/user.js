const User = require("../../models/user");
const { createToken } = require("../../services/token");

const checkUser = async (req, res) => {
  const user = req.body;
  try {
    const isUserValid = await User.findOne({
      email: user.email,
      password: user.password,
    });
    if (!isUserValid) {
      res.status(400).json({
        status: false,
        error: true,
        msg: "user not found",
      });
    } else {
      const token = createToken(isUserValid);
      res.status(200).json({
        status: true,
        error: false,
        msg: "login successful",
        token: token,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      err: err.message,
      msg: "internal server error",
    });
  }
};

module.exports = {
  checkUser,
};
