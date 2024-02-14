const multer = require("multer");
const path = require("path");

// Set up storage for files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./assets/photos"); // Destination folder for photos
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}_${file.originalname}`;
        cb(null, fileName);
    },
});

const fileFilter = (req, file, cb) => {
    // Check file types and reject if not an image
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Please upload an image."), false);
    }
};


const deliveryin = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 50 }, // 5 MB file size limit
});

module.exports = deliveryin;
