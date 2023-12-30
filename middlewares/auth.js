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
        msg: "unauthorized token",
      });
    }
  } else {
    res.status(401).json({
      status: false,
      error: true,
      msg: "please provide authorization token",
    });
  }
};

module.exports = {
  authntication,
};
