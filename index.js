const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { customerRoute } = require("./routes/customer");
const multer = require("multer");
const { userRouter } = require("./routes/user");
const { authntication } = require("./middlewares/auth");
const { companyRouter } = require("./routes/company");
const { subscriptionRoute } = require("./routes/subscription");
const { companyDataRouter } = require("./routes/settings");
const connectionToDB = require("./db/connection");
const { Customer } = require("./models/customer");
const { fuelRouter } = require("./routes/fueltype");
const { manufacturerRouter } = require("./routes/manufacturers");
const { modelRouter } = require("./routes/model");
const { vehicleRouter } = require("./routes/vehicle");
const { documentRoute } = require("./routes/document");

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/assets", express.static("assets"));

// define all routes

// customerRoute
app.use("/api/v1/customer", authntication, customerRoute);

// user routes
app.use("/api/v1/user", userRouter);

// company routes
app.use("/api/v1/company", authntication, companyRouter);

//subscription routes
app.use("/api/v1/subscription", authntication, subscriptionRoute);

// settings company routes
app.use("/api/v1/settings/", authntication, companyDataRouter);

// fuel routes
app.use("/api/v1/fueltype", authntication, fuelRouter);

// manufacturerRouter routes
app.use("/api/v1/manufacturers", authntication, manufacturerRouter);

// Model routes
app.use("/api/v1/model", authntication, modelRouter);

// Vehicle routes
app.use("/api/v1/vehicle", authntication, vehicleRouter);

// Document routes
app.use("/api/v1/document", authntication, documentRoute);

connectionToDB(process.env.MONGO_URL).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
