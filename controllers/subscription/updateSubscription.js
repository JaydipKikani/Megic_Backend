const { Subscriptions, MiscSetting } = require("../../models/subscription");

const updateSubscription = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  let miskSetting;
  try {
    const getSubscription = await Subscriptions.findById(id);
    if (getSubscription !== null) {
      const updateFields = {};

      const nonNestedFields = ["comp_id", "subscription_name", "cpr"];
      nonNestedFields.forEach((field) => {
        if (data[field]) {
          updateFields[field] = data[field];
        }
      });

      const fieldsToUpdate = [
        "base_cost",
        "cost_per_adk",
        "total_loss_theft_access",
        "bail",
        "exte_cleaning",
        "inte_cleaning",
        "vehicle_immobilization_cost",
      ];

      fieldsToUpdate.forEach((field) => {
        if (data[field]) {
          for (const [key, value] of Object.entries(data[field])) {
            updateFields[`${field}.${key}`] = value;
          }
        }
      });
      const subscription = await Subscriptions.findOneAndUpdate(
        { _id: id },
        { $set: updateFields },
        {
          new: true,
        }
      );
      if (data.miscSetting) {
        miskSetting = await MiscSetting.findOneAndUpdate(
          { sub_id: id },
          data.miscSetting,
          {
            new: true,
          }
        );
      }
      res.status(200).json({
        status: true,
        error: false,
        msg: "subscription updated successfully.",
        data: {
          subscription,
          miskSetting,
        },
      });
    } else {
      res.status(404).json({
        status: false,
        error: true,
        msg: "subscription not found",
      });
    }
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
  updateSubscription,
};
