const express = require("express");
const {
  createCourse,
  getAllCourse,
  getCourseId,
  getCourseName,
} = require("../Controllers/courseController");

const routeCourse = express.Router();

routeCourse.post("/create_course", createCourse);
routeCourse.get("/get_courses", getAllCourse);
routeCourse.get("/:id", getCourseId);
routeCourse.get("/name/:id", getCourseName);

module.exports = routeCourse;
