const { Router } = require("express");
const { addReservation } = require("../controllers/reservation/addReservation");
const { getReservationById } = require("../controllers/reservation/GetReservationById");
const { updateReservation } = require("../controllers/reservation/updateReservation");
const { getReservations } = require("../controllers/reservation/getReservations");
const { deleteReservationById } = require("../controllers/reservation/deleteReservationById");

const router = Router();

router.post("/add", addReservation);
router.get("/:id", getReservationById);
router.patch("/:id", updateReservation);
router.get("/", getReservations);
router.delete("/:id", deleteReservationById);

module.exports = {
    reservationRouter: router,
};
