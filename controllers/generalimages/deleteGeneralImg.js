const { General_Setting } = require("../../models/generalsetting");
const fs = require("fs"); // Import the fs module to delete files

const deleteGeneralImg = async (req, res) => {
  try {
    const { general_info, types } = req.body;

    // Find the existing document by general_info
    let generalSetting = await General_Setting.findOne({ general_info });

    if (!generalSetting) {
      return res.status(404).json({ status: false, msg: "General setting not found" });
    }

    const imagePathsToRemove = [];

    for (const type of types) {
      if (type === "Header") {
        imagePathsToRemove.push(generalSetting.Header);
        generalSetting.Header = null;
      } else if (type === "Photoshoot") {
        imagePathsToRemove.push(generalSetting.Photoshoot);
        generalSetting.Photoshoot = null;
      } else {
        return res.status(400).json({ status: false, msg: `Invalid image type: ${type}` });
      }
    }

    // Save the updated document to the database
    await generalSetting.save();

    // Remove the image files from the server
    for (const imagePath of imagePathsToRemove) {
      if (imagePath) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ status: true, data: generalSetting, msg: "Images removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: true, msg: "Internal server error" });
  }
};

module.exports = {
  deleteGeneralImg,
};