// import mongoose
const mongoose = require("mongoose");

// design schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true 
    },
    email: {
      type: String,
      required: true 
    },
    password: {
      type: String,
      required: true 
    },
    avatar: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now()
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);