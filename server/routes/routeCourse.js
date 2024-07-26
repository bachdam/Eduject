const express = require("express");
const {
  createCourse,
  getAllCourse,
  getCourse,
} = require("../Controllers/courseController");

const routeCourse = express.Router();

routeCourse.post("/create_course", createCourse);
routeCourse.get("/get_courses", getAllCourse);
routeCourse.get("/:id", getCourse);

module.exports = routeCourse;
