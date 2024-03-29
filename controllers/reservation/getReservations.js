const Reservation = require("../../models/reservation");


const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate({
        path: "company_id",
        select: "name",
      })
      .populate({
        path: "general_id",
        select: "model manufacturer", // Include the fields you want from the General model
        populate: [
          {
            path: "model",
            select: "name", // Include the fields you want from the Model model
          },
          {
            path: "manufacturer",
            select: "name", // Include the fields you want from the Manufacturer model
          },
          {
            path: "general_info",
            model: "GeneralInfo",
            select: "license_plate damage_maintenance",
          },
        ],
      })
      .populate({
        path: "customer_id",
        select: "firstname lastname",
        populate: {
          path: "driver_id",
          select: "driver_first driver_last",
        },
      });

    return res.status(200).json({
      status: true,
      error: false,
      msg: "Get List of Reservations successfully.",
      data: reservations,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: true,
      msg: error.message,
    });
  }
};

module.exports = {
  getReservations,
};
