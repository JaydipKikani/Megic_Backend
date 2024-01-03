const Customer = require("../../models/customer");
const fs = require("fs");

const {
  requireFieldErrorMessege,
  getDuplicateErrorMessage,
} = require("../../services/validation");

const createCustomer = async (req, res) => {
  const customer = req.body;
  const file = req?.file;
  try {
    // handle profile imge here

    const newCustomer = await Customer.create({ ...customer });
    if (newCustomer !== null) {
      if (req.file) {
        const imgPath = `/assets/licence/${newCustomer._id}${file.filename}`;
        fs.rename(
          `./assets/licence/${file.filename}`,
          `./assets/licence/${newCustomer._id}${file.filename}`,
          (err) => {
            if (err) {
              // Handle error while renaming file
              console.log("error handling file: " + err);
              return res.status(500).json({
                status: "error",
                error: err.message,
              });
              // Exit function early if file handling fails
            }
            newCustomer.licence = imgPath;
            newCustomer.save();
          }
        );
      }

      return res.status(201).json({
        status: true,
        error: false,
        msg: "customer created successfully.",
        data: newCustomer,
      });
    }
  } catch (err) {
    if (req.file) {
      fs.unlink(`./assets/licence/${file.filename}`, (err) => {
        console.log("deleteing....");
        if (err) {
          console.log("error while deleting file: " + err);
        } else {
          console.log("successfully deleted file");
        }
      });
    }

    let errors = "";
    if (err.code === 11000 && err.keyPattern && err.keyValue) {
      const errorMessage = getDuplicateErrorMessage(err);
      errors = errorMessage;
      return res.status(422).json({
        status: false,
        error: true,
        msg: errors,
      });
    } else if (err.name === "ValidationError") {
      errors = requireFieldErrorMessege(err);
      return res.status(422).json({
        status: false,
        error: true,
        msg: errors,
      });
    } else {
      console.log(err);
      return res.status(500).json({
        status: false,
        error: true,
        msg: "Internal Server error",
      });
    }
  }
};

module.exports = createCustomer;
