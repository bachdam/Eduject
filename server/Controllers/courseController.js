const Course = require("../Schema/courseSchema");

//create course
const createCourse = async (req, res) => {
  try {
    const { title, instructor, language, categories, tags, price, detail } =
      req.body;
    const newCourse = new Course({
      title,
      instructor,
      language,
      categories,
      tags,
      price,
      detail,
    });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.log("Detailed error:", error); // Log detailed error in console
    res
      .status(500)
      .json({ message: "Error saving course", error: error.toString() });
  }
};

module.exports = { createCourse };