const mongoose = require('mongoose');

// Define schema for General_Setting
const generalSettingSchema = new mongoose.Schema({
    general_info: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GeneralInfo",
        required: true,
    },
    Header: String,
    Photoshoot: String,
    '360_interieur': String,
    '360_exterieur': String,
});

// Create models from the schemas
const General_Setting = mongoose.model('General_Setting', generalSettingSchema);

// Option List Description
const optionListSchema = new mongoose.Schema({
    general_info: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GeneralInfo",
        required: true,
    },
    description: {
        FR: String, // French description
        EN: String  // English description
    },
    Option_Interior: {
        FR: String, // French description
        EN: String  // English description
    },
    Option_Exterieur: {
        FR: String, // French description
        EN: String  // English description
    },
    Option_Confort: {
        FR: String, // French description
        EN: String  // English description
    }
});

// Create model from the schema
const Option_List = mongoose.model('Option_List', optionListSchema);

module.exports = Option_List;

// Define schema for visibilite
const visibiliteSchema = new mongoose.Schema({
    general_info: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GeneralInfo",
        required: true,
    },
    One_Of_One: String,
    Electrique: String,
    Engine: String,
    Consumption: String,
    V_Max: String,
    RangeData: String
});

// Create models from the schemas
const Visibilite = mongoose.model('Visibilite', visibiliteSchema);

module.exports = { General_Setting, Visibilite, Option_List };