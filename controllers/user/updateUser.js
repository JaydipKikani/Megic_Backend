const User = require("../../models/user");
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: false,
                error: true,
                msg: 'User not found.',
            });
        }

        // Extract update data from the request body
        const {
            fname,
            lname,
            email,
            company,
            company_vat,
            phone_no,
            address,
            state,
            zipcode,
            country,
            language,
            password,
        } = req.body;

        // Update user fields
        user.fname = fname || user.fname;
        user.lname = lname || user.lname;
        user.email = email || user.email;
        user.company = company || user.company;
        user.company_vat = company_vat || user.company_vat;
        user.phone_no = phone_no || user.phone_no;
        user.address = address || user.address;
        user.state = state || user.state;
        user.zipcode = zipcode || user.zipcode;
        user.country = country || user.country;
        user.language = language || user.language;

        // Update password if provided
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        if (req.file) {
            if (user.profilePhoto) {
                const existingProfilePhotoPath = path.join(__dirname, `../../${user.profilePhoto}`);
                await fs.unlink(existingProfilePhotoPath);
            }

            const newProfilePhotoPath = `/assets/profile/${userId}${path.extname(req.file.originalname)}`;

            // Move the uploaded file to the new path
            const newPath = path.join(__dirname, `../../assets/profile/${userId}${path.extname(req.file.originalname)}`);
            await fs.rename(req.file.path, newPath);

            user.profilePhoto = newProfilePhotoPath;
        }

        // Save the updated user to the database
        await user.save();

        res.status(200).json({
            status: true,
            error: false,
            msg: 'User updated successfully',
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
                profilePhoto: user.profilePhoto,
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
    updateUser,
};
