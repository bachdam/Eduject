const express = require("express");
const { createLesson } = require("../Controllers/lessonController");

const routeLesson = express.Router();

routeLesson.post("/create_lesson", createLesson);

module.exports = routeLesson;
