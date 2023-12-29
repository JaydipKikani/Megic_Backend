const jwt = require("jsonwebtoken");

const createToken = (data) => {
  const token = jwt.sign(
    {
      user: data,
    },
    process.env.JWT_SECRET
  );
  return token;
};

const verifyToken = (token) => {
  const data = jwt.verify(token, process.env.JWT_SECRET);
  if (data) {
    return data.user;
  } else {
    return throwError("invalid token");
  }
};

module.exports = {
  createToken,
  verifyToken,
};
