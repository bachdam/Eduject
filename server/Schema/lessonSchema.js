const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    detail: { type: String },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      require: true,
    },
  },
  { timestamps: true }
);

const Lesson = mongoose.model("Lesson", LessonSchema);
module.exports = Lesson;
