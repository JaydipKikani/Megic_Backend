const { Invoice, ProductDetail } = require("../../models/invoice");

const getInvoiceById = async (req, res) => {
    try {
        const invoiceId = req.params.id;

        const invoice = await Invoice
            .findById(invoiceId)
            .populate('company_id')
            .populate('customer_id')
            .populate({
                path: "general_id",
                select: "model manufacturer", // Include the fields you want from the General model
                populate: [
                    {
                        path: "model",
                        select: "name", // Include the fields you want from the Model model
                    },
                    {
                        path: "manufacturer",
                        select: "name", // Include the fields you want from the Manufacturer model
                    },
                    {
                        path: "general_info",
                        model: "GeneralInfo",
                        select: "license_plate damage_maintenance",
                    },
                ],
            })
            .populate('productDetails');


        if (!invoice) {
            return res.status(404).json({
                status: false,
                error: true,
                msg: 'Invoice not found',
            });
        }

        // You can also include the separately queried productDetails
        const productDetails = await ProductDetail.find({ bill_id: invoice._id });

        const manufacturerName = invoice.general_id?.manufacturer?.name || "";
        const modelName = invoice.general_id?.model?.name || "";
        const licensePlate = invoice.general_id?.general_info?.license_plate || "";
        const vehiclename = `${manufacturerName} ${modelName}: ${licensePlate}`;

        const responseData = {
            invoice,
            vehiclename,
            ...(productDetails.length > 0 && { productDetails }),
        };

        return res.json({
            status: true,
            error: false,
            msg: 'Get Invoice with Details Successfully',
            data: responseData,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: true,
            msg: error.message,
        });
    }
};

module.exports = {
    getInvoiceById
};
