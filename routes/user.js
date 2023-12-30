const { Router } = require("express");
const { checkUser } = require("../controllers/user/user");

const router = Router();

router.post("/", checkUser);

module.exports = {
  userRouter: router,
};
