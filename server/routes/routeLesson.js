const express = require("express");
const {
  createLesson,
  getAllLesson,
} = require("../Controllers/lessonController");

const routeLesson = express.Router();

routeLesson.post("/create_lesson", createLesson);
routeLesson.get("/get_all_lesson", getAllLesson);

module.exports = routeLesson;
