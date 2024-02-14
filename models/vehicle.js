const mongoose = require("mongoose");

// Define schema for fuel_type
const fuelTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const FuelType = mongoose.model("FuelType", fuelTypeSchema);

// vehicleCategory schema for fuel_type
const vehicleCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const VehicleCategory = mongoose.model(
  "VehicleCategory",
  vehicleCategorySchema
);

const FinanceTypesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const FinanceTypes = mongoose.model("FinanceType", FinanceTypesSchema);

// Define schema for manufacturer
const manufacturerSchema = new mongoose.Schema({
  name: String,
});

const Manufacturer = mongoose.model("Manufacturer", manufacturerSchema);

// Define schema for model
const modelSchema = new mongoose.Schema({
  name: String,
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manufacturer",
  },
});

const Model = mongoose.model("Model", modelSchema);

// Define schema for general_info
const generalInfoSchema = new mongoose.Schema({
  main_fuel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FuelType",
    required: true,
  },
  second_fuel: { type: mongoose.Schema.Types.ObjectId, ref: "FuelType" },
  chassis_number: { type: String, required: true },
  license_plate: String,
  co2_emissions: { type: Number, required: true },
  k_w: Number,
  resume: String,
  displacement: Number,
  good: String,
  tank_size: Number,
  tax_power: { type: Number, required: true },
  transmission: String,
  seat_name: String,
  no_doors: Number,
  tags: [
    {
      name: String,
      value: {
        type: String,
        enum: ["before", "after", "both", "null"],
      },
    },
  ],
});

const GeneralInfo = mongoose.model("GeneralInfo", generalInfoSchema);

// Define schema for InsuranceInfo
const insuranceInfoSchema = new mongoose.Schema({
  general_info: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GeneralInfo",
    required: true,
  },
  issuer: String,
  date_issue: { type: Date, required: true },
  support_contact: String,
  info: String,
  flight_franchise: String,
  franchise_crash: String,
  total_claims: Number,
});

const InsuranceInfo = mongoose.model("InsuranceInfo", insuranceInfoSchema);

// Define schema for variables
const variablesSchema = new mongoose.Schema({
  general_info: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GeneralInfo",
    required: true,
  },
  wheel_type: String,
  memo: String,
  price: Number,
});

const Variables = mongoose.model("Variables", variablesSchema);

// Define schema for financial_information
const financialInfoSchema = new mongoose.Schema({
  general_info: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GeneralInfo",
    required: true,
  },
  registered_by: String,
  finance_type: { type: mongoose.Schema.Types.ObjectId, ref: "FinanceType" },
  purchase_option: Boolean,
  funded_by: String,
  soon_suite: String,
});

const FinancialInfo = mongoose.model("FinancialInfo", financialInfoSchema);

// Define schema for general
const generalSchema = new mongoose.Schema({
  general_info: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GeneralInfo",
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manufacturer",
    required: true,
  },
  model: { type: mongoose.Schema.Types.ObjectId, ref: "Model", required: true },
  vehicle_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VehicleCategory",
    required: true,
  },
  vehicle_location: String,
  year: Number,
  color: String,
  status: String,
  active: String,
  min_age_driver: { type: Number, required: true },
  license_class: String,
});

const General = mongoose.model("General", generalSchema);

// Define schema for damage_maintenance
const damageMaintenanceSchema = new mongoose.Schema({
  general_info: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GeneralInfo",

    required: true,
  },
  next_mileage: Number,
  next_date: Date,
  pre_mileage: Number,
  pre_date: Date,
});

const DamageMaintenance = mongoose.model(
  "DamageMaintenance",
  damageMaintenanceSchema
);

// Define schema for damage
const damageSchema = new mongoose.Schema({
  general_info: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GeneralInfo",
    required: true,
  },
  damage_type: String,
  damage_cost: Number,
});

const Damage = mongoose.model("Damage", damageSchema);

// Define schema for document
const documentSchema = new mongoose.Schema({
  general_info: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GeneralInfo",
    required: true,
  },
  document: [{ type: String }],
});

const Document = mongoose.model("Document", documentSchema);

module.exports = {
  FuelType,
  VehicleCategory,
  FinanceTypes,
  GeneralInfo,
  InsuranceInfo,
  Variables,
  FinancialInfo,
  General,
  Manufacturer,
  Model,
  DamageMaintenance,
  Damage,
  Document,
};
