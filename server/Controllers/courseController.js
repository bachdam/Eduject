const Course = require("../Schema/courseSchema");

//create course
const createCourse = async (req, res) => {
  try {
    const { title, instructor, language, categories, intro, price } = req.body; //add title, instructor, language, categories, tags, price,
    const newCourse = new Course({
      title,
      instructor,
      language,
      categories,
      intro,
      price,
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

//get all courses
const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get a course
const getCourseId = async (req, res) => {
  try {
    const course = await Course.find({}, { projection: { _id: 1 } });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get course name
const getCourseName = async (req, res) => {
  try {
    const course_id = req.params.id;
    const course = await Course.findById(course_id, {
      projection: { _id: 0 },
    });
    console.log(course);
    res.status(200).json(course.title);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createCourse, getAllCourse, getCourseId, getCourseName };
