const User = require("../../models/user");
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const { isValidPassword } = require("../../middlewares/isValidPassword");

const addUser = async (req, res) => {
    try {
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
            password
        } = req.body;


        const profilePhoto = req.file ? `/assets/profile/${req.file.filename}` : null;

        // Validate the password
        // if (!isValidPassword(password)) {
        //     return res.status(400).json({
        //         status: false,
        //         error: true,
        //         msg: "Invalid password. Please ensure it meets the specified requirements.",
        //     });
        // }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
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
            password: hashedPassword,
            profilePhoto,
        });

        // Save the user to the database
        await user.save();

        if (req.file) {
            const newProfilePhotoPath = `/assets/profile/${user._id}${path.extname(req.file.originalname)}`;

            // Rename the uploaded file using the user's _id
            const oldPath = path.join(__dirname, `../../assets/profile/${req.file.filename}`);
            const newPath = path.join(__dirname, `../../assets/profile/${user._id}${path.extname(req.file.originalname)}`);

            fs.rename(oldPath, newPath, async (err) => {
                if (err) {
                    // Handle error while renaming file
                    console.log("Error handling file: " + err);
                    return res.status(500).json({
                        status: "error",
                        error: err.message,
                    });
                }

                // Update the user's profilePhoto field with the new path
                try {
                    const updatedUser = await User.findByIdAndUpdate(
                        user._id,
                        { profilePhoto: newProfilePhotoPath },
                        { new: true }
                    ).exec();

                    res.status(201).json({
                        status: true,
                        error: false,
                        msg: "User registered successfully",
                        data: {
                            id: updatedUser._id.toString(),
                            fname: updatedUser.fname,
                            lname: updatedUser.lname,
                            email: updatedUser.email,
                            company: updatedUser.company,
                            company_vat: updatedUser.company_vat,
                            phone_no: updatedUser.phone_no,
                            address: updatedUser.address,
                            state: updatedUser.state,
                            zipcode: updatedUser.zipcode,
                            country: updatedUser.country,
                            language: updatedUser.language,
                            profilePhoto: updatedUser.profilePhoto,
                        }
                    });
                } catch (updateErr) {
                    console.error("Error updating user profilePhoto:", updateErr);
                    return res.status(500).json({
                        status: "error",
                        error: updateErr.message,
                    });
                }
            });
        } else {
            res.status(201).json({
                status: true,
                error: false,
                msg: "User registered successfully",
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
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = {};
            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            return res.status(400).json({
                status: true,
                error: false,
                msg: "Validation error",
                details: errors,
            });
        }
        res.status(500).json({
            status: true,
            error: false,
            msg: "Error occurred while registering user",
            details: error.message,
        });
    }
};

module.exports = {
    addUser,
};
