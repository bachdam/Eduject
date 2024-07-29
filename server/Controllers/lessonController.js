const Lesson = require("../Schema/lessonSchema");

//create lesson
const createLesson = async (req, res) => {
  try {
    const { title, detail, course_id } = req.body;
    const newLesson = new Lesson({ title, detail, course_id });
    await newLesson.save();
    console.log(newLesson);
    res.status(201).json(newLesson);
  } catch (error) {
    res.status(400).json(error);
  }
};

//get lessons of a course
const getAllLessons = async (req, res) => {
  try {
    const course_id = req.params.id;
    console.log(course_id);
    const lessons = await Lesson.find({ course_id });
    console.log(lessons);
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createLesson, getAllLessons };
