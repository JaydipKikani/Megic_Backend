const express = require("express");
const router = express.Router();
const CheckData = require("../../models/checkdata");
const GeneralInfo = require("../../models/vehicle");
const Reservation = require("../../models/reservation");

const addOrUpdateTags = async (reservationId, tags) => {
  try {
    const reservation = await Reservation.findById(reservationId).populate({
      path: 'general_id',
      populate: {
        path: 'general_info',
        model: 'GeneralInfo',
      },
    });

    if (!reservation) {
      throw new Error('Reservation not found');
    }

    const generalInfo = reservation.general_id.general_info;

    if (!generalInfo) {
      throw new Error('GeneralInfo not found');
    }

    generalInfo.tags = tags;
    await generalInfo.save();
  } catch (error) {
    console.error(error);
    throw new Error('Error updating tags in GeneralInfo');
  }
};


const createCheck = async (req, res) => {
  try {
    const reservation_id = req.body.reservation_id;
    const existingCheckData = await CheckData.findOne({ reservation_id });

    let tags = req.body.tags || [];

    if (existingCheckData) {
      // Update existing record
      existingCheckData.exterior_damage = req.body.exterior_damage.map((item, index) => ({
        damage_part: item.damage_part,
        stripe: item.stripe,
        parts: item.parts,
        image: req.files[`exterior_damage[${index}][image]`] ? req.files[`exterior_damage[${index}][image]`].map(file => file.path) : existingCheckData.exterior_damage[index].image,
      }));

      existingCheckData.interior_damage = req.body.interior_damage.map((item, index) => ({
        interior_damage_part: item.interior_damage_part,
        stripe: item.stripe,
        images: req.files[`interior_damage[${index}][images]`] ? req.files[`interior_damage[${index}][images]`].map(file => file.path) : existingCheckData.interior_damage[index].images,
      }));

      existingCheckData.tags = tags; // Update tags

      // Save updated data to the database
      const updatedCheckData = await existingCheckData.save();
      await addOrUpdateTags(reservation_id, tags);

      res.status(200).json({
        status: true,
        message: 'Check data updated successfully',
        data: {
          checkData: updatedCheckData,
          tags: tags, // Include tags data in the response
        },
      });
    } else {
      // Create a new record
      const newCheckData = new CheckData({
        reservation_id: reservation_id,
        exterior_damage: req.body.exterior_damage.map((item, index) => ({
          damage_part: item.damage_part,
          stripe: item.stripe,
          parts: item.parts,
          image: req.files[`exterior_damage[${index}][image]`] ? req.files[`exterior_damage[${index}][image]`].map(file => file.path) : null,
        })),
        interior_damage: req.body.interior_damage.map((item, index) => ({
          interior_damage_part: item.interior_damage_part,
          stripe: item.stripe,
          images: req.files[`interior_damage[${index}][images]`] ? req.files[`interior_damage[${index}][images]`].map(file => file.path) : [],
        })),
        tags: tags, // Add tags
        status: req.body.status || 0, // Add status
      });

      // Save new check data to the database
      const savedCheckData = await newCheckData.save();
      await addOrUpdateTags(reservation_id, tags);

      res.status(200).json({
        status: true,
        message: 'Check data inserted successfully',
        data: {
          checkData: savedCheckData,
          tags: tags, // Include tags data in the response
        },
      });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ status: false, message: 'Internal Server Error', data: null });
  }
};

module.exports = {
  createCheck,
};
