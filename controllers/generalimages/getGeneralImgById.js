const { General_Setting } = require("../../models/generalsetting");

const getGeneralImgById = async (req, res) => {
  try {
    const id = req.params.id;
    const general = await General_Setting.find({ general_info: id }).select("-__v");

    if (!general) {
      return res.status(404).json({
        status: false,
        error: true,
        msg: "Images not found.",
      });
    }
    return res.status(200).json({
      status: true,
      error: false,
      msg: "Get Images List successfully",
      data: general,
    });
  } catch (error) {
    errors = requireFieldErrorMessege(err);
    return res.status(500).json({
      status: false,
      error: true,
      msg: error.message,
    });
  }
};

module.exports = {
  getGeneralImgById,
};
