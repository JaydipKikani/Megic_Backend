const Reservation = require("../../models/reservation");
const General = require("../../models/vehicle");
const CheckData = require("../../models/checkdata"); // Import the CheckData model

const getCheckinList = async (req, res) => {
  try {
    const currentDate = new Date();
    const oneDayBefore = new Date(currentDate);
    oneDayBefore.setDate(currentDate.getDate() - 7);
    const twoDaysAfter = new Date(currentDate);
    twoDaysAfter.setDate(currentDate.getDate() + 7);

    const reservations = await Reservation.find({
      $or: [
        { start_date: { $gte: oneDayBefore, $lte: twoDaysAfter } },
        {
          start_date: { $lt: oneDayBefore },
          return_date: { $gte: currentDate },
        },
      ],
    })
      .populate({
        path: "general_id",
        populate: [
          { path: "manufacturer", model: "Manufacturer", select: "name" },
          { path: "model", model: "Model", select: "name" },
          {
            path: "general_info",
            model: "GeneralInfo",
            select: "license_plate damage_maintenance",
          },
        ],
      });

    const reservationIds = reservations.map((reservation) => reservation._id);

    const checkData = await CheckData.find({
      reservation_id: { $in: reservationIds },
      status: 3,
    });

    const filteredReservations = reservations
      .filter((reservation) =>
        checkData.some((check) => check.reservation_id.equals(reservation._id))
      )
      .map((reservation) => ({
        _id: reservation._id,
        company_id: reservation.company_id,
        general_info: {
          _id: reservation.general_id._id,
          license_plate: reservation.general_id.general_info.license_plate,
          damage_maintenance: reservation.general_id.general_info.damage_maintenance,
          manufacturer: {
            _id: reservation.general_id.manufacturer._id,
            name: reservation.general_id.manufacturer.name,
          },
          model: {
            _id: reservation.general_id.model._id,
            name: reservation.general_id.model.name,
          },
        },
        start_date: reservation.start_date,
        return_date: reservation.return_date,
      }));

    res.status(200).json({
      status: true,
      error: false,
      msg: "Reservation information retrieved successfully",
      data: filteredReservations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      error: true,
      msg: "Internal Server Error",
      data: null,
    });
  }
};

module.exports = {
  getCheckinList,
};
