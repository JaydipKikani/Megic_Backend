const mongoose = require("mongoose");

const checkSchema = new mongoose.Schema({
  reservation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation", // Reference to the Reservation model
    required: true,
  },
  exterior_damage: [
    {
      damage_part: String,
      stripe: String,
      parts: String,
      image: [String],
    },
  ],
  interior_damage: [
    {
      interior_damage_part: String,
      stripe: String,
      images: [String],
    },
  ],
  status: {
    type: Number,
    default: 0,
  },
});

const CheckData = mongoose.model("Check", checkSchema);

module.exports = CheckData;
