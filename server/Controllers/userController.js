const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Schema/userSchema");
const Course = require("../Schema/courseSchema");

//token
const createToken = (_id) => {
  jwtKey = process.env.Secrete;
  return jwt.sign({ _id }, jwtKey);
};

//signup user
const createUser = async (req, res) => {
  const {
    name,
    gender,
    username,
    password,
    email,
    role,
    num_of_courses,
    courses_list,
  } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(401).json("A user with this email already exists!");
  }

  if (!username || !email || !password) {
    return res.status(401).json("All fields are required!");
  }

  //create new user if all fields satisfy
  newUser = new User({
    name,
    gender,
    username,
    password,
    email,
    role,
    num_of_courses,
    courses_list,
  });

  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  newUser = new User({
    name,
    gender,
    username,
    password: hash,
    email,
    role,
    num_of_courses,
    courses_list: [],
  });

  await newUser.save();
  const token = createToken(user._id);
  res.status(200).json({ _id: user._id, username, email, token });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json("Invalid email or password!");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json(`Invalid email or password! ${password}:${user.password}`);
    }

    //if login success, create token
    const token = createToken(user._id);
    res.status(200).json({
      _id: user._id,
      name: user.username,
      email,
      role: user.role,
      token,
    });
    console.log("token:", token);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

//update user
const updateUser = async (req, res) => {};

//delet user
const deleteUser = async (req, res) => {};

// Add course to user's courses list
const enrollInCourse = async (req, res) => {
  const { userId, courseId } = req.params;
  console.log(req.params);
  console.log("userID in CONTROLLER", userId);
  console.log("courseId in CONTROLLER", courseId);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the courseId is already in the user's courses
    if (!user.courses_list.includes(courseId)) {
      user.courses_list.push(courseId);
      await user.save();
      res.status(200).json({
        message: `Course ${courseId} enrolled successfully`,
        courses: user.courses,
      });
    } else {
      res
        .status(400)
        .json({ error: `User already enrolled in course ${courseId}` });
    }
  } catch (error) {
    console.error("Error enrolling in course:", error);
    res.status(500).json({ error: "Server error" });
  }
};

//get all user's courses
const getAllUserCourses = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).select("courses_list");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Use the user’s courses to find all courses they are enrolled in
    const courses = await Course.find({ _id: { $in: user.courses_list } });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json(error);
  }
};

// module.exports = {
//   registerUser,
//   enrollInCourse,
//   // ... other exports
// };

//save courseid
// Add course ID to user's courses list
// const saveCourseId = async (userId, courseId) => {
//   try {
//     const user = await User.findById(userId);
//     if (!user) throw new Error("User not found");

//     // Ensure the course ID is not already in the array
//     if (!user.courses.includes(courseId)) {
//       user.courses.push(courseId);
//       await user.save();
//       console.log(`Course ${courseId} saved for user ${userId}`);
//     } else {
//       console.log(`Course ${courseId} is already in the user's courses list.`);
//     }
//   } catch (error) {
//     console.error("Error saving course ID:", error);
//   }
// };

// sign up postman
// {
//   "name": "B",
//   "gender": "male",
//   "username":"b",
//   "password":"b",
//   "email":"b@gmail.com"
// }
module.exports = { createUser, loginUser, enrollInCourse, getAllUserCourses };
