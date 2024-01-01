const { Router } = require("express");
const {
  addSubscription,
} = require("../controllers/subscription/addSubscription");
const {
  deleteSubscription,
} = require("../controllers/subscription/deleteSubscription");
const {
  updateSubscription,
} = require("../controllers/subscription/updateSubscription");
const {
  getSubscription,
} = require("../controllers/subscription/getSubscription");

const router = Router();

router.get("/:id", getSubscription);

router.post("/", addSubscription);

router.delete("/:id", deleteSubscription);

router.patch("/:id", updateSubscription);

module.exports = {
  subscriptionRoute: router,
};
