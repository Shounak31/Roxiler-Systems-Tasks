const mongoose = require("mongoose");

async function connectDatabase(url) {
  try {
    await mongoose.connect(url);
    //console.log("MongoDB Connected Successfully!!!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
}

module.exports = connectDatabase;
