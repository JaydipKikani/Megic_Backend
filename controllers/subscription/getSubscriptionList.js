const { Subscriptions } = require("../../models/subscription");

const getSubscriptionList = async (req, res) => {
  const { id } = req.params;

  try {
    const subsciption = await Subscriptions.find({ comp_id: id }).select(
      "_id subscription_name"
    );
    res.status(200).json({
      status: true,
      error: false,
      msg: "subsciption information gets successfully",
      data: subsciption,
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
  getSubscriptionList,
};
