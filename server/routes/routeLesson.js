const express = require("express");
const {
  createLesson,
  getAllLessons,
} = require("../Controllers/lessonController");

const routeLesson = express.Router();

routeLesson.post("/:id/create_lesson", createLesson);
routeLesson.get("/:id/get_all_lessons", getAllLessons);

module.exports = routeLesson;
