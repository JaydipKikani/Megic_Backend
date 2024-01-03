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
const {
  getSubscriptionList,
} = require("../controllers/subscription/getSubscriptionList");

const router = Router();

router.get("/:id", getSubscription);

router.get("/getsubbyid/:id", getSubscriptionList);

router.post("/", addSubscription);

router.delete("/:id", deleteSubscription);

router.patch("/:id", updateSubscription);

module.exports = {
  subscriptionRoute: router,
};
