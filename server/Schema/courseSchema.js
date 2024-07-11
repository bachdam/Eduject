const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define Review Sub-schema
const ReviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Define Lecture Sub-schema
const LectureSchema = new Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  description: { type: String },
  resources: [String],
});

// Define Section Sub-schema
const SectionSchema = new Schema({
  title: { type: String, required: true },
  lectures: [LectureSchema],
});

// Define Course Schema
const CourseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  language: { type: String, required: true },
  categories: [String],
  tags: [String],
  price: { type: Number, required: true },
  discountedPrice: { type: Number },
  thumbnailUrl: { type: String, required: true },
  promoVideoUrl: { type: String },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  sections: [SectionSchema],
  reviews: [ReviewSchema],
  averageRating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  totalEnrollments: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Pre-save middleware to update `updatedAt`
CourseSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = CourseSchema;
