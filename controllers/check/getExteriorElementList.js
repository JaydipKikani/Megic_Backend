const {  ElementType } = require("../../models/checklist");

const getExteriorElementList = async (req, res) => {
  try {
    const exteriorElementList = await ElementType.find();
    res.status(200).json({
      status: true,
      message: 'Exterior Element list retrieved successfully',
      data: exteriorElementList,
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
  getExteriorElementList,
};
