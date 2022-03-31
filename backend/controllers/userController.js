const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs/dist/bcrypt");
const generateToken = require("../utils/generateToken");
const cloudinary = require("cloudinary").v2;

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, picture, idPicture } = req.body;
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
    idPicture,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      picture: user.picture,
      idPicture: user.idPicture,
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
        idPicture: user.idPicture,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }
  }
  res.status(400);
  throw new Error("Invalid credentials!");
});

const updateUser = asyncHandler(async (req, res) => {
  cloudinary.config({
    cloud_name: "dmz19yaoz",
    api_key: "472581828874271",
    api_secret: "f8aL0GHklSBkiYy40J1LKbCUiXY",
  });

  const user = await User.findById(req.user._id);
  const { currentPicture } = req.body;

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (currentPicture) {
      cloudinary.uploader.destroy(currentPicture);
      user.picture = req.body.picture || user.picture;
      user.idPicture = req.body.idPicture || user.idPicture;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      password: updatedUser.password,
      picture: updatedUser.picture,
      idPicture: updatedUser.idPicture,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not found");
  }
});

module.exports = { registerUser, authUser, updateUser };
