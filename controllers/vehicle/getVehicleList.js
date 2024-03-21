const express = require("express");
const mongoose = require("mongoose");
const { General, GeneralInfo, Manufacturer, Model, DamageMaintenance, Document } = require("../../models/vehicle");
const Reservation = require("../../models/reservation");
const { Delivery, DeliveryIn } = require("../../models/delivery");

const getVehicleList = async (req, res) => {
  try {
    const vehicles = await General.find(
      {},
      "manufacturer model license_plate vehicle_location status active general_info"
    )
      .populate({
        path: "general_info",
        select: "license_plate damage_maintenance",
      })
      .populate("manufacturer", "name")
      .populate("model", "_id name")
      .exec();

    const formattedVehicles = [];

    for (const vehicle of vehicles) {
      const generalInfo = vehicle.general_info || {
        license_plate: null,
        damage_maintenance: null,
      };

      const documentData = await Document.findOne({ general_info: vehicle.general_info }).exec();

      const damageMintance = []; // Assuming you have the required logic for damage maintenance

      const reservation = await Reservation.findOne({ general_id: vehicle._id });
      let vehicleLocation = "";

      if (reservation) {
        // If the vehicle is in a reservation, set the location to "Client Location"
        vehicleLocation = reservation.cust_loc;
      } else {
        // If the vehicle is not in a reservation, set the location to "Return location from the previous reservation"
        const previousReservation = await Reservation.findOne({ general_id: vehicle._id }).sort({ return_date: -1 });

        if (previousReservation) {
          vehicleLocation = previousReservation.return_loc;
        } else {
          vehicleLocation = vehicle?.vehicle_location; // Set a default location if no reservation is found
        }
      }

      // Fetch the last deliveryOut record for the current vehicle
      const lastDeliveryOut = await Delivery.findOne({ r_id: reservation?._id }).sort({ updated_date: -1 }).limit(1);

      // Fetch the last deliveryIn record for the current vehicle
      const lastDeliveryIn = await DeliveryIn.findOne({ r_id: reservation?._id }).sort({ updated_date: -1 }).limit(1);
      const lastUpdatedDate = new Date(Math.max(
        lastDeliveryOut?.updated_date || 0,
        lastDeliveryIn?.updated_date || 0
      ));

      formattedVehicles.push({
        _id: vehicle?._id,
        general_id: generalInfo?._id,
        manufacturer: vehicle?.manufacturer?.name,
        model: vehicle?.model?.name,
        license_plate: generalInfo?.license_plate,
        vehicle_location: vehicleLocation,
        vehicle_id: vehicle?.model?._id,
        status: vehicle?.status,
        active: vehicle?.active,
        km_counter: lastDeliveryIn?.km_counter || lastDeliveryOut?.km_counter || 0,
        updated_date: lastUpdatedDate,
        damage_maintenance: damageMintance[0] || null,
        documents: documentData ? documentData.document : []
      });
    }

    return res.json({
      status: true,
      error: false,
      msg: "Get Vehicle List Successfully",
      data: formattedVehicles,
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
  getVehicleList,
};
