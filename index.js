const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { customerRoute } = require("./routes/customer");
const multer = require("multer");
const { userRouter } = require("./routes/user");
const { authntication } = require("./middlewares/auth");
const { companyRouter } = require("./routes/company");

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/assets", express.static("assets"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets"); // Destination directory where files will be stored
  },
  filename: function (req, file, cb) {
    // Define the filename for uploaded files
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
    // Example: fieldname-1627633861696.jpg
  },
});

// define all routes

// customerRoute
app.use("/api/v1/customer", authntication, customerRoute);

// user routes
app.use("/api/v1/user", userRouter);

// company routes
app.use("/api/v1/company", companyRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose.connect(process.env.CONNECT_STRING).then((connection) => {
  console.log("Connected to MongoDB");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

module.exports = {
  storage: storage,
};
