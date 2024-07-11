const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8080;
const atlasURL = process.env.ATLAS_URI;
const CourseSchema = require("./Schema/courseSchema");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", route);

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

const Course = mongoose.model("Course", CourseSchema); // Ensure CourseSchema is being passed here

// Routes
app.post("/api/courses", async (req, res) => {
  try {
    const detail = req.body;
    const newCourse = new Course({ detail });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.log("Detailed error:", error); // Log detailed error in console
    res
      .status(500)
      .json({ message: "Error saving course", error: error.toString() });
  }
});

app.listen(port, () => {
  console.log(`Backend runs on ${port}`);
});

mongoose
  .connect(atlasURL)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log("MongoDB connection error:", err));
