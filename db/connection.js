const { default: mongoose } = require("mongoose");

async function connectionToDB(url) {
  try {
    await mongoose.connect(url);
    console.log("connected to mongodb");
  } catch (err) {
    console.log("error connecting to mongodb: ", err);
  }
}

module.exports = connectionToDB;
