const { Subscriptions, MiscSetting } = require("../../models/subscription");

const getSubscription = async (req, res) => {
  const { id } = req.params;

  try {
    const subsciption = await Subscriptions.findById(id)
      .populate({
        path: "comp_id",
        select: "name",
      });
    const miscSetting = await MiscSetting.findOne({ sub_id: id });
    const responseData = {
      subscription: subsciption,
      miscSetting: miscSetting,
    };
    
    res.status(200).json({
      status: true,
      error: false,
      msg: "subsciption information gets successfully",
      data: responseData,
    });
  } catch (err) {
    res.status(404).json({
      status: false,
      error: true,
      msg: "subsciption is not found",
    });
  }
};

module.exports = {
  getSubscription,
};
