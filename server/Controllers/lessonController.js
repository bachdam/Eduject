const Lesson = require("../Schema/lessonSchema");

//create lesson
const createLesson = async (req, res) => {
  try {
    const { title, detail, courseId } = req.body;
    const newLesson = new Lesson({ title, detail, courseId });
    await newLesson.save();
    res.status(201).json(newLesson);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { createLesson };
