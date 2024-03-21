const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = file.fieldname === 'exterior_damage' ? 'exterior_damage' : 'interior_damage';
    const uploadPath = path.join('./', 'assets', 'checkdata', folder);

    // Check if the folder exists, create it if not
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});


const fileFilter = (req, file, cb) => {
  if (
    file.fieldname === "exterior_damage" ||
    file.fieldname === "interior_damage"
  ) {
    // Allow only certain file types (you can adjust the mimetypes as needed)
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG and PNG are allowed."));
    }
  } else {
    cb(new Error("Unexpected field"));
  }
};

const upload = multer({
  storage: storage,
});
// /fileFilter: fileFilter,

module.exports = upload;