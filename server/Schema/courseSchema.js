const mongoose = require("mongoose");
const { countDocuments } = require("./userSchema");

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructor: { type: String, require: true },
  language: { type: [String], required: true },
  categories: [String],
  price: { type: Number, required: true },
  intro: { type: String, min: 40 },
  user_list: [String],
  // detail: { type: String, require: true },
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
