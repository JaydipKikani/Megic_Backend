const { Customer } = require("../../models/customer");
const { Delivery } = require("../../models/delivery");
const Reservation = require("../../models/reservation");
const { MiscSetting } = require("../../models/subscription");

const getDeliveryOutById = async (req, res) => {
    try {
        const { id } = req.params;

        const reservationData = await Reservation.findById(id)
            .populate({
                path: "general_id",
                populate: [
                    { path: "manufacturer", model: "Manufacturer", select: "name" },
                    { path: "model", model: "Model", select: "name" },
                    {
                        path: "general_info",
                        model: "GeneralInfo",
                        select: "license_plate damage_maintenance",
                    },
                    { path: "vehicle_category", model: "VehicleCategory", select: "name" },
                ],
            })
            .populate({
                path: "customer_id",
                populate: [
                    { path: "driver_id" },
                    { path: "sub_id", model: "Subscriptions" },
                    { path: "comp_id", model: "Company", select: "name" },
                ],
            });
        if (!reservationData) {
            return res.status(404).json({
                status: false,
                error: true,
                msg: "Reservation not found",
                data: null,
            });
        }

        const deliveryData = await Delivery.findOne({ r_id: id });

        const deliveryInfo = deliveryData
            ? {
                km_counter: deliveryData.km_counter,
                fuel_gauge: `${deliveryData.fuel_gauge_numerator}/${deliveryData.fuel_gauge_denominator}`,
            }
            : null;
        // const customerData = await Customer.populate(reservationData.customer_id, {
        //     path: "driver_id sub_id",
        // });

        // if (!customerData) {
        //     return res.status(400).json({
        //         status: false,
        //         error: true,
        //         msg: "Customer information not found for this reservation",
        //         data: null,
        //     });
        // }
        const customerData = reservationData.customer_id ? await Customer.populate(reservationData.customer_id, { path: "driver_id sub_id" }) : {};
        const driverData = customerData.driver_id || {};
        const subscriptionData = customerData.sub_id || {};
        const companyData = customerData.comp_id || {};


        // Get subscription data based on vehicle_category name
        const isMaintenanceOrRepair = reservationData.status === "Maintenance" || reservationData.status === "Repair";
        console.log("isMaintenanceOrRepair =>", isMaintenanceOrRepair);
        const vehicleCategoryName = `category${reservationData.general_id.vehicle_category.name}`;
        const subscriptionInfoForCategory = isMaintenanceOrRepair ? null : {
            subscription_name: subscriptionData.subscription_name,
            base_cost: subscriptionData.base_cost[vehicleCategoryName],
            bail: subscriptionData.bail[vehicleCategoryName],
            total_loss_theft_access: subscriptionData.total_loss_theft_access[vehicleCategoryName],
            cost_per_adk: subscriptionData.cost_per_adk[vehicleCategoryName],
            fuel_fill_price: "3€",
            exte_cleaning: subscriptionData.exte_cleaning[vehicleCategoryName],
            inte_cleaning: subscriptionData.inte_cleaning[vehicleCategoryName],
            vehicle_immobilization_cost: subscriptionData.vehicle_immobilization_cost[vehicleCategoryName],
        };



        const customerInfo = isMaintenanceOrRepair ? null : {
            _id: customerData._id,
            firstname: customerData.firstname,
            lastname: customerData.lastname,
            address: customerData.address,
            city: customerData.city,
            country: customerData.country,
            cust_type: customerData.cust_type,
            company_name: companyData.name,
        };

        const driverInfo = isMaintenanceOrRepair ? null : {
            _id: driverData._id,
            driver_first: driverData.driver_first,
            driver_last: driverData.driver_last,
            driver_address: driverData.driver_address,
            driver_city: driverData.driver_city,
            driver_country: driverData.driver_country,
            driver_email: driverData.driver_email,
            driver_phone: driverData.driver_phone,
            id_card: driverData.id_card,
            license: driverData.license,
        };

        // Populate miscSetting data
        const miscSettingData = await MiscSetting.findOne({ sub_id: subscriptionData._id });

        const miscSettingInfo = isMaintenanceOrRepair ? null : {
            admin_cost: miscSettingData.admin_cost,
            add_cost: miscSettingData.add_cost,
            svarnish: miscSettingData.svarnish,
            lvarnish: miscSettingData.lvarnish,
            redowheel: miscSettingData.redowheel,
        };

        res.status(200).json({
            status: true,
            error: false,
            msg: "Reservation data retrieved successfully",
            data: {
                _id: reservationData._id,
                start_date: reservationData.start_date,
                dept_loc: reservationData.dept_loc,
                return_date: reservationData.return_date,
                return_loc: reservationData.return_loc,
                cust_loc: reservationData.cust_loc,
                general_info: {
                    _id: reservationData.general_id._id,
                    license_plate: reservationData.general_id.general_info.license_plate,
                    damage_maintenance: reservationData.general_id.general_info.damage_maintenance,
                    manufacturer: {
                        _id: reservationData.general_id.manufacturer._id,
                        name: reservationData.general_id.manufacturer.name,
                    },
                    model: {
                        _id: reservationData.general_id.model._id,
                        name: reservationData.general_id.model.name,
                    },
                    vehicle_category: {
                        _id: reservationData.general_id.vehicle_category._id,
                        name: reservationData.general_id.vehicle_category.name,
                    },
                },
                delivery_info: deliveryInfo,
                customer_info: customerInfo,
                driver_info: driverInfo,
                subscription_info: subscriptionInfoForCategory,
                miscSetting: miscSettingInfo,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            error: true,
            msg: "Internal Server Error",
            data: null,
        });
    }
};

module.exports = {
    getDeliveryOutById,
};
