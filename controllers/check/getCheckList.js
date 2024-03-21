const Reservation = require("../../models/reservation");
const General = require("../../models/vehicle"); // Import the General model
const CheckData = require("../../models/checkdata"); // Import the CheckData model

const getCheckList = async (req, res) => {
  try {
    const currentDate = new Date();
    const oneDayBefore = new Date(currentDate);
    oneDayBefore.setDate(currentDate.getDate() - 1);
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
    const filteredReservations = [];

    console.log("reservations", reservations);
    for (const reservation of reservations) {
      // Check if general_id is null
      if (!reservation.general_id) {
        console.log("General info is null for reservation:", reservation._id);
        continue;
      }

      // Continue processing as before
      const checkData = await CheckData.findOne({
        reservation_id: reservation._id,
        status: { $ne: 0 } // Ensuring status is not 0
      });

      if (!checkData) {
        filteredReservations.push({
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
        });
      }
    }

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
  getCheckList,
};