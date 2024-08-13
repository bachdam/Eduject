const express = require("express");
const routeProtected = express.Router();
const verifyToken = require("./authMiddleware");
// Protected route
routeProtected.get("/", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed" });
});

module.exports = routeProtected;
