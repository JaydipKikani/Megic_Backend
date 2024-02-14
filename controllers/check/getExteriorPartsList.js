const { ExteriorParts } = require("../../models/checklist");

const getExteriorPartsList = async (req, res) => {
  try {
    const exteriorPartsList = await ExteriorParts.find();
    res.status(200).json({
      status: true,
      message: 'Exterior parts list retrieved successfully',
      data: exteriorPartsList,
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
  getExteriorPartsList,
};
