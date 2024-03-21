const User = require("../../models/user");
const fs = require('fs').promises;

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: false,
                error: true,
                msg: 'User not found.',
            });
        }
        res.status(200).json({
            status: true,
            error: false,
            msg: 'User retrieved successfully',
            data: {
                id: user._id.toString(),
                fname: user.fname,
                lname: user.lname,
                email: user.email,
                company: user.company,
                company_vat: user.company_vat,
                phone_no: user.phone_no,
                address: user.address,
                state: user.state,
                zipcode: user.zipcode,
                country: user.country,
                language: user.language,
                profilePhoto: user.profilePhoto
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            error: true,
            msg: error.message,
        });
    }
};

module.exports = {
    getUserById,
};
