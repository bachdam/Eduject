const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 4,
    required: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100,
    unique: true,
  },
  role: {
    type: String,
    default: "Basic",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
