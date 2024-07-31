const express = require("express");
const {
  createLesson,
  getAllLessons,
  updateLesson,
  deleteLesson,
} = require("../Controllers/lessonController");

const routeLesson = express.Router();

routeLesson.post("/:id", createLesson);
routeLesson.get("/:id", getAllLessons);
routeLesson.put("/:id/:lesson_id", updateLesson);
routeLesson.delete("/:id/:lesson_id", deleteLesson);

module.exports = routeLesson;
