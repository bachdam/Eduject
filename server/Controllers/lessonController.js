const Lesson = require("../Schema/lessonSchema");

//create lesson
const createLesson = async (req, res) => {
  try {
    const { title, detail, course_id } = req.body;
    if (title == "" || detail == "") {
      return res.status(400).json({ message: "All field are required!" });
    }
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
    // console.log(lessons);
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json(error);
  }
};

//update a lesson of a course
const updateLesson = async (req, res) => {
  try {
    const { lesson_id } = req.params;
    console.log(req.params.lesson_id);
    const { title, detail } = req.body;
    const updatedLesson = await Lesson.findByIdAndUpdate(
      lesson_id,
      { title, detail },
      { new: true, runValidators: true }
    );
    console.log(updatedLesson);
    res.status(201).json(updatedLesson);
  } catch (error) {
    res.status(400).json(error);
  }
};

//delete a lesson
const deleteLesson = async (req, res) => {
  try {
    const { lesson_id } = req.params;
    console.log(req.params.lesson_id);
    const deletedLesson = await Lesson.findByIdAndDelete(lesson_id);
    console.log(deletedLesson);
    res.status(201).json(deletedLesson);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { createLesson, getAllLessons, updateLesson, deleteLesson };
