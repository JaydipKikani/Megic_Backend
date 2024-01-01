const { Subscriptions } = require("../../models/subscription");

const deleteSubscription = async (req, res) => {
  const { id } = req.params;
  try {
    const subsciption = await Subscriptions.findOneAndDelete({ _id: id });
    const miscSetting = await Subscriptions.findOneAndDelete({ sub_id: id });
    if (subsciption !== null) {
      res.status(200).json({
        status: true,
        error: false,
        msg: "subscription deleted successfully.",
        data: {
          subsciption,
          miscSetting,
        },
      });
    } else {
      res.status(404).json({
        status: false,
        error: true,
        msg: "subscription not found",
      });
    }
  } catch (err) {}
};

module.exports = {
  deleteSubscription,
};
