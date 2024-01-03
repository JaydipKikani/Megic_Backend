const { default: mongoose } = require("mongoose");

async function connectionToDB(url) {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectionToDB;
