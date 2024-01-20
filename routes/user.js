const { Router } = require("express");
const { checkUser } = require("../controllers/user/user");
const { addUser } = require("../controllers/user/adduser");
const { updateUser } = require("../controllers/user/updateUser");
const { getUserById } = require("../controllers/user/getUserbyId");
const upload = require("../middlewares/profile");
const { deleteUserByID } = require("../controllers/user/deleteUserById");
const { updatePasswordUser } = require("../controllers/user/updatePasswordUser");

const router = Router();

router.post("/add", upload.single("profile"), addUser);
router.post("/", upload.single("profile"), checkUser);
router.put("/:id", upload.single("profile"), updateUser);
router.get("/:id", getUserById);
router.delete("/:id", upload.single("profile"), deleteUserByID);
router.post("/changepassword", upload.none(), updatePasswordUser);

module.exports = {
  userRouter: router,
};
