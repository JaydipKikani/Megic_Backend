const User = require("../../models/user");
const fs = require('fs').promises;
const path = require('path');

const deleteUserByID = async (req, res) => {
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

        // Remove user's profile photo from the file system if available
        if (user.profilePhoto) {
            const profilePhotoPath = path.join(__dirname, `../../${user.profilePhoto}`);

            try {
                await fs.unlink(profilePhotoPath);
            } catch (unlinkError) {
                // Handle the case where the file is not found (ENOENT)
                if (unlinkError.code !== 'ENOENT') {
                    throw unlinkError; // Re-throw the error if it's not related to file not found
                }
            }
        }

        // Remove the user from the database
        await User.findByIdAndDelete(userId);

        res.status(200).json({
            status: true,
            error: false,
            msg: 'User deleted successfully'
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
    deleteUserByID,
};
