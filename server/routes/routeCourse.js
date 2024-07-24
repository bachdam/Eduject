const express = require("express");
const {
  createCourse,
  getAllCourse,
} = require("../Controllers/courseController");

const routeCourse = express.Router();

routeCourse.post("/create_course", createCourse);
routeCourse.get("/get_courses", getAllCourse);

module.exports = routeCourse;
