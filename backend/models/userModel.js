const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 124,
      minLength: [1, "Name is required"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "is invalid!, "],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "To short!"],
      maxLength: 124,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    picture: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
