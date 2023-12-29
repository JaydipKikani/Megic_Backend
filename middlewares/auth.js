const { verifyToken } = require("../services/token");

const authntication = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const data = verifyToken(token);
      next();
    } catch (err) {
      res.status(401).json({
        status: false,
        error: true,
        msg: "unauthorized",
      });
    }
  } else {
    res.status(500).json({
      status: false,
      error: true,
      msg: "internal server error",
    });
  }
};

module.exports = {
  authntication,
};
