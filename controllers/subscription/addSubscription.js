const { Subscriptions } = require("../../models/subscription");

const { MiscSetting } = require("../../models/subscription");
const { requireFieldErrorMessege } = require("../../services/validation");

const addSubscription = async (req, res) => {
  const data = req.body;

  try {
    let newMisc;
    const newSubscription = await Subscriptions.create(data);
    if (data.miscSett) {
      newMisc = await MiscSetting.create({
        ...data.miscSett,
        sub_id: newSubscription._id,
      });
    }
    res.status(200).json({
      status: true,
      error: false,
      msg: "subscription added successfully.",
      data: {
        newSubscription,
        newMisc,
      },
    });
  } catch (err) {
    console.error("Error in adding subscription:", err);
    let errors = "";
    if (err.name === "ValidationError") {
      errors = requireFieldErrorMessege(err);
      res.status(401).json({
        status: false,
        error: true,
        msg: errors,
      });
    } else {
      res.status(500).json({
        status: false,
        error: true,
        msg: "internal error",
      });
    }
  }
};

module.exports = {
  addSubscription,
};
