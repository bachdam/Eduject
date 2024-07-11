const express = require("express");
const { createUser, loginUser } = require("../Controllers/userController");

const route = express.Router();

route.post("/signup", createUser);
route.post("/login", loginUser);

module.exports = route;
