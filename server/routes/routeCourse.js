const express = require("express");
const { createCourse, getCourse } = require("../Controllers/courseController");

const routeCourse = express.Router();

routeCourse.post("/create_course", createCourse);
routeCourse.get("/get_courses", getCourse);

module.exports = routeCourse;
