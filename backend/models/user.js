const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false, // Password is optional, e.g., for Google-authenticated users
  },
  authSource: {
    type: String,
    enum: ["self", "google"], // Defines the allowed values for authSource
    default: "self", // Sets the default value to "self"
  },
});

module.exports = mongoose.model("User", userSchema);
