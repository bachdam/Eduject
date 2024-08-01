const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Schema/userSchema");

//token
const token = (_id) => {
  jwtKey = process.env.Secrete;
  jwt.sign({ _id }, jwtKey);
};

//signup user
const createUser = async (req, res) => {
  const { name, gender, username, password, email, role, num_of_courses } =
    req.body;
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
  });

  newUser.save();
  res.status(200).json(newUser);
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const isPasswordCorrect = bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res
      .status(401)
      .json(`Invalid email or password! ${password}:${user.password}`);
  }

  res.status(200).json("Login successed!");
};

//update user
const updateUser = async (req, res) => {};

//delet user
const deleteUser = async (req, res) => {};

// sign up postman
// {
//   "name": "B",
//   "gender": "male",
//   "username":"b",
//   "password":"b",
//   "email":"b@gmail.com"
// }
module.exports = { createUser, loginUser };
