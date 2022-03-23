const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs/dist/bcrypt");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, picture } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(404);
    throw new Error("User already exist!");
  }
  const user = await User.create({
    name,
    email,
    password,
    picture,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      picture: user.picture,
    });
  }
  if (!user) {
    res.status(400);
    throw new Error("Error!");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }
  }
  res.status(400);
  throw new Error("Invalid credentials!");
});
module.exports = { registerUser, authUser };
