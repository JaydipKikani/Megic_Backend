const express = require("express");
const { Option_List, Visibilite } = require("../../models/generalsetting");

// List all FuelType entries
const getbyIdVisibilite = async (req, res) => {
  try {
    const general_info_id = req.params.id;
    const optionListData = await Option_List.findOne({ general_info: general_info_id });

    // Find Visibilite data by general_info ID
    const visibiliteData = await Visibilite.findOne({ general_info: general_info_id });

    if (!optionListData && !visibiliteData) {
      return res.status(404).json({ status: false, error: true, msg: "No data found for the given general_info ID" });
    }

    res.status(200).json({
      status: true,
      error: false,
      data: {
        optionListData,
        visibiliteData
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      error: true,
      msg: "Internal server error"
    });
  }
};

module.exports = {
  getbyIdVisibilite,
};
