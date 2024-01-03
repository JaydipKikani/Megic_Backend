const { Subscriptions } = require("../../models/subscription");

const { MiscSetting } = require("../../models/subscription");
const { requireFieldErrorMessege, getDuplicateErrorMessage } = require("../../services/validation");

const addSubscription = async (req, res) => {
  const data = req.body;

  try {
    let newMisc;
    const newSubscription = await Subscriptions.create(data);
    if (data.miscSetting) {
      newMisc = await MiscSetting.create({
        ...data.miscSetting,
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
    let errors = "";
    if (err.code === 11000 && err.keyPattern && err.keyValue) {
      const errorMessage = getDuplicateErrorMessage(err);
      errors = errorMessage;
      return res.status(422).json({
        status: false,
        error: true,
        msg: errors,
      });
    } else if (err.name === "ValidationError") {
      errors = requireFieldErrorMessege(err);
      return res.status(422).json({
        status: false,
        error: true,
        msg: errors,
      });
    } else {
      console.log(err);
      return res.status(500).json({
        status: false,
        error: true,
        msg: "Internal server error",
      });
    }
  }
};

module.exports = {
  addSubscription,
};
