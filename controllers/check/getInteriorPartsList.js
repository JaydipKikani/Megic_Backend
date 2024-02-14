const {  InteriorDamage } = require("../../models/checklist");

const getInteriorPartsList = async (req, res) => {
  try {
    const interiorPartsList = await InteriorDamage.find();
    res.status(200).json({
      status: true,
      message: 'Interior parts list retrieved successfully',
      data: interiorPartsList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      data: null,
    });
  }
};

module.exports = {
  getInteriorPartsList,
};
