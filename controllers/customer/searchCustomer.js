const { Customer } = require("../../models/customer");
const searchCustomer = async (req, res) => {
  const { customername, comp_id, sub_id } = req.body;
  try {
    const query = {};

    if (customername) {
      query.$or = [
        { firstname: { $regex: new RegExp(customername, "i") } },
        { lastname: { $regex: new RegExp(customername, "i") } },
      ];
    }
    if (comp_id) {
      query.comp_id = comp_id;
    }

    if (sub_id) {
      query.sub_id = sub_id;
    }
    const result = await Customer.find(query)
      .populate("comp_id", "name")
      .populate("sub_id", "subscription_name");
    if (result.length === 0) {
      res.status(404).json({
        status: true,
        error: false,
        msg: "No data found",
      });
    } else {
      res.status(200).json({
        status: true,
        error: false,
        msg: "Customer search successful",
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: true,
      msg: error.message,
    });
  }
};

module.exports = searchCustomer;
