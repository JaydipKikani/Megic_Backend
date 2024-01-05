const mongoose = require("mongoose");

const comman_category = {
  category1: { type: Number },
  category2: { type: Number },
  category3: { type: Number },
  category4: { type: Number },
  category5: { type: Number },
};

const subscriptionsScehma = mongoose.Schema({
  comp_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Company",
  },
  subscription_name: {
    type: String,
    required: true,
  },
  cpr: { type: Number, required: true },
  base_cost: {
    type: comman_category,
    required: true,
    _id: false,
  },
  cost_per_adk: {
    type: comman_category,
    _id: false,
  },
  total_loss_theft_access: {
    type: comman_category,
    _id: false,
  },
  bail: {
    type: comman_category,
    _id: false,
  },
  exte_cleaning: {
    type: comman_category,
    _id: false,
  },
  inte_cleaning: {
    type: comman_category,
    _id: false,
  },
  vehicle_immobilization_cost: {
    type: comman_category,
    _id: false,
  },
});

const miscSettingSchema = mongoose.Schema({
  admin_cost: Number,
  add_cost: Number,
  svarnish: String,
  lvarnish: String,
  redowheel: String,
  sub_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscriptions",
  },
});

const Subscriptions = mongoose.model(
  "Subscriptions",
  subscriptionsScehma,
  "Subscriptions"
);

const MiscSetting = mongoose.model(
  "MiscSetting",
  miscSettingSchema,
  "MiscSetting"
);

module.exports = {
  Subscriptions,
  MiscSetting,
};
