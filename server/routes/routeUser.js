const express = require("express");
const { createUser, loginUser } = require("../Controllers/userController");

const routeUser = express.Router();

routeUser.post("/signup", createUser);
routeUser.post("/login", loginUser);

module.exports = routeUser;
