const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const { createToken } = require('../../services/token');
const { isValidPassword } = require('../../middlewares/isValidPassword');

const updatePasswordUser = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword, confirmPassword } = req.body;

        // Check if the new password and confirm password match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                status: false,
                error: true,
                msg: 'New password and confirm password do not match.',
            });
        }

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: false,
                error: true,
                msg: 'User not found.',
            });
        }

        // Verify the old password
        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);

        if (!isOldPasswordValid) {
            return res.status(401).json({
                status: false,
                error: true,
                msg: 'Invalid old password.',
            });
        }


        // Validate the password
        if (!isValidPassword(newPassword)) {
            return res.status(400).json({
                status: false,
                error: true,
                msg: "Invalid password. Please ensure it meets Minimum 8 characters long,one lowercase,one number, symbol, or whitespace character",
            });
        }
        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        user.password = hashedNewPassword;
        await user.save();


        const token = createToken({ userId: user._id, email: user.email });
        res.status(200).json({
            status: true,
            error: false,
            msg: 'Password changed successfully.',
            data: {
                _id: user._id.toString(),
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
                token,
            },
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
    updatePasswordUser,
};
