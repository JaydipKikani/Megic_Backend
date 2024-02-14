const {  InteriorStripe } = require("../../models/checklist");

const getInteriorStripeList = async (req, res) => {
  try {
    const interiorStripeList = await InteriorStripe.find();
    res.status(200).json({
      status: true,
      message: 'Interior Stripe list retrieved successfully',
      data: interiorStripeList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      data: null,
    });
  }
};

module.exports = {
  getInteriorStripeList,
};
