const mongoose = require("mongoose");
const { dbConfig } = require("../config/config");

const connectDB = async () => {
  try {
    await mongoose.connect(dbConfig.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;