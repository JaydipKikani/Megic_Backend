const {ExteriorStripe } = require("../../models/checklist");

const getExteriorStripeList = async (req, res) => {
  try {
    const exteriorStripeList = await ExteriorStripe.find();
    res.status(200).json({
      status: true,
      message: 'Exterior Stripe list retrieved successfully',
      data: exteriorStripeList,
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
  getExteriorStripeList,
};
