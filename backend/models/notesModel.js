const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      minLength: [4, "To short!"],
      maxLength: [64, "To loong"],
    },
    content: {
      type: String,
      required: true,
      minLength: [4, "To short!"],
      maxLength: [254, "To loong!"],
    },
  },
  {
    timestamps: true,
  }
);

const Notes = mongoose.model("Note", noteSchema);
module.exports = Notes;
