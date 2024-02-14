const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Exterior Parts Schema
const exteriorPartsSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
  });
  const ExteriorParts = mongoose.model('ExteriorParts', exteriorPartsSchema);
  
  // Exterior Stripe Schema
  const exteriorStripeSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
  });
  const ExteriorStripe = mongoose.model('ExteriorStripe', exteriorStripeSchema);
  
  // Element Type Schema
  const elementTypeSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
  });
  const ElementType = mongoose.model('ElementType', elementTypeSchema);
  
  // Interior Damage Schema
  const interiorDamageSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
  });
  const InteriorDamage = mongoose.model('InteriorDamage', interiorDamageSchema);
  
  // Interior Stripe Schema
  const interiorStripeSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
  });
  const InteriorStripe = mongoose.model('InteriorStripe', interiorStripeSchema);
  
  module.exports = {
    ExteriorParts,
    ExteriorStripe,
    ElementType,
    InteriorDamage,
    InteriorStripe,
  };