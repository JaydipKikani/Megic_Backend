const { Router } = require("express");
const { getCheckList } = require("../controllers/check/getCheckList");
const { createCheck } = require("../controllers/check/createCheckData");
const upload = require("../middlewares/check");
const {
  getCheckDataByReservationId,
} = require("../controllers/check/getCheckDataByReservationId");
const { getExteriorElementList } = require("../controllers/check/getExteriorElementList");
const { getExteriorStripeList } = require("../controllers/check/getExteriorStripeList");
const { getInteriorStripeList } = require("../controllers/check/getInteriorStripeList");
const { getInteriorPartsList } = require("../controllers/check/getInteriorPartsList");
const { getExteriorPartsList } = require("../controllers/check/getExteriorPartsList");
const { getCheckinList } = require("../controllers/check/getCheckinList");
const { addCheckin } = require("../controllers/check/addCheckin");
const router = Router();

const damageFields = Array.from({ length: 10 }, (_, index) => ({
  name: `exterior_damage[${index}][image]`
}));

const interiorFields = Array.from({ length: 10 }, (_, index) => ({
  name: `interior_damage[${index}][images]`
}));

router.post("/add", upload.fields([...damageFields, ...interiorFields]), createCheck);
router.get("/:id", getCheckDataByReservationId);
router.get("/listdata/exterior-parts", getExteriorPartsList);
router.get("/listdata/exterior-stripe", getExteriorStripeList);
router.get("/listdata/exterior-element", getExteriorElementList);
router.get("/listdata/interior-parts", getInteriorPartsList);
router.get("/listdata/interior-stripe", getInteriorStripeList);
router.get("/", getCheckList);
router.get("/listdata/checkin", getCheckinList);
router.post("/addcheckin", addCheckin);

module.exports = {
  checkRouter: router,
};
