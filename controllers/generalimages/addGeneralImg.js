const { General_Setting } = require("../../models/generalsetting");
const path = require("path"); // Import the path module

const addGeneralImg = async (req, res) => {
  try {
    const { general_info } = req.body;
    const { Header, Photoshoot } = req.files;
    const getRelativePath = (absolutePath) => {
      return path.relative(process.cwd(), absolutePath).replace(/\\/g, '/');
    };

    // Construct paths for Header and Photoshoot images
    const headerImagePath = Header ? getRelativePath(Header[0].path) : null;
    const photoshootImagePath = Photoshoot ? getRelativePath(Photoshoot[0].path) : null;

    // Find the existing document by general_info
    let generalSetting = await General_Setting.findOne({ general_info });

    if (!generalSetting) {
      // If not found, create a new document
      generalSetting = new General_Setting({
        general_info,
        Header: headerImagePath,
        Photoshoot: photoshootImagePath
      });
    } else {
      // If found, update only the provided image paths
      if (Header) {
        generalSetting.Header = headerImagePath;
      }
      if (Photoshoot) {
        generalSetting.Photoshoot = photoshootImagePath;
      }
    }

    // Save the document to the database
    await generalSetting.save();

    res.status(200).json({ status: true, data: generalSetting, msg: "Images uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: true, msg: "Internal server error" });
  }
};

module.exports = {
  addGeneralImg,
};
