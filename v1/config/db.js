const mongoose = require("mongoose");
require("dotenv").config({ quiet: true });

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("mongodb database connected successfully");
    })
    .catch((err) => {
      console.log(err);
      console.log("failed to connect mongodb database");
    });
};

module.exports = connectDB;
