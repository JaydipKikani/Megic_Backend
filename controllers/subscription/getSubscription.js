const { Subscriptions } = require("../../models/subscription");

const getSubscription = async (req, res) => {
  const { id } = req.params;

  try {
    const subsciption = await Subscriptions.findById(id);
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
  getSubscription,
};
