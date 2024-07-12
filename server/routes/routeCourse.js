const express = require("express");
const { createCourse } = require("../Controllers/courseController");

const routeCourse = express.Router();

routeCourse.post("/create-course", createCourse);

module.exports = routeCourse;
