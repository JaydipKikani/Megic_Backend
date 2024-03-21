const CheckData = require("../../models/checkdata");
const Reservation = require("../../models/reservation");

const addCheckin = async (req, res) => {
  const { reservation_id, status } = req.body;

  try {
    console.log("reservation_id", reservation_id)
    // Check if Reservation exists
    const existingReservation = await Reservation.findById(reservation_id);
    if (!existingReservation) {
      return res.status(404).json({
        status: false,
        error: true,
        msg: "Reservation not found",
        data: null,
      });
    }

    // Check if CheckData already exists for the given reservation_id
    let checkData = await CheckData.findOne({ reservation_id });

    if (checkData) {
      // Update existing CheckData status only
      checkData.status = status;
      await checkData.save();

      // Respond with the success structure
      res.status(200).json({
        status: true,
        error: false,
        msg: "Check data added/updated successfully",
        data: { reservation_id, status },
      });
    } else {
      // Create new CheckData if not exists
      checkData = new CheckData({
        reservation_id,
        status,
      });
      await checkData.save();

      // Respond with the success structure
      res.status(200).json({
        status: true,
        error: false,
        msg: "Check data added/updated successfully",
        data: { reservation_id, status },
      });
    }
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

module.exports = { addCheckin };
