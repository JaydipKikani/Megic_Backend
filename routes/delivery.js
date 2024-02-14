const { Router } = require("express");
const { getDeliveryOutList } = require("../controllers/delivery/getDeliveryOutList");
const { getDeliveryInList } = require("../controllers/delivery/getDeliveryInList");
const { getDeliveryOutById } = require("../controllers/delivery/getDeliveryOutById");
const { addDeliveryOut } = require("../controllers/delivery/addDeliveryOut");
const upload = require("../middlewares/driver");
const deliveryin = require("../middlewares/deliveryin");
const { addDeliveryIn } = require("../controllers/delivery/addDeliveryIn");
const { getDeliveryInById } = require("../controllers/delivery/getDeliveryInById");

const router = Router();


router.post("/deliveryout", upload.fields([{ name: "id_card", maxCount: 1 }, { name: "license", maxCount: 1 }]), addDeliveryOut);
router.post("/deliveryin", deliveryin.array("photos", 12), addDeliveryIn);

router.get("/deliveryout/:id", getDeliveryOutById);
router.get("/deliveryin/:id", getDeliveryInById);
router.get("/deliveryout", getDeliveryOutList);
router.get("/deliveryin", getDeliveryInList);



module.exports = {
  deliveryRouter: router,
};
