const express = require("express");
const mongoose = require("mongoose");
const routeUser = require("./routes/routeUser");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8080;
const atlasURL = process.env.ATLAS_URI;
const routeCourse = require("./routes/routeCourse");
const routeLesson = require("./routes/routeLesson");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true }));

//api
app.use("/api/user", routeUser);
app.use("/api/courses", routeCourse);
app.use("/api/courses/:id/lessons", routeLesson);

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

app.listen(port, () => {
  console.log(`Backend runs on ${port}`);
});

mongoose
  .connect(atlasURL)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log("MongoDB connection error:", err));
