const express = require("express");
const {
  createUser,
  loginUser,
  enrollInCourse,
  getAllUserCourses,
} = require("../Controllers/userController");

const routeUser = express.Router();

routeUser.post("/signup", createUser);
routeUser.post("/login", loginUser);
routeUser.post("/:userId/enroll/:courseId", enrollInCourse);
routeUser.post("/:userId/get_courses", getAllUserCourses);

module.exports = routeUser;
