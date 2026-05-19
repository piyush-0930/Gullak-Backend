import bcrypt from "bcryptjs";

import User from "../models/User.js";

import generateToken from "../utils/generateToken.js";

import asyncHandler from "../utils/asyncHandler.js";


// REGISTER USER
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // CHECK EXISTING USER
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);

    throw new Error("User already exists");
  }

  // HASH PASSWORD
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  // CREATE USER
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // GENERATE TOKEN
  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    },
  });
});


// LOGIN USER
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // FIND USER
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);

    throw new Error("Invalid credentials");
  }

  // CHECK PASSWORD
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(401);

    throw new Error("Invalid credentials");
  }

  // GENERATE TOKEN
  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    },
  });
});


// GET CURRENT USER
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.status(200).json({
    success: true,
    data: user,
  });
});