const mongoose = require("mongoose");

const connectDb = () => {
  return mongoose.connect("mongodb url")
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));
};

module.exports = { connectDb };
