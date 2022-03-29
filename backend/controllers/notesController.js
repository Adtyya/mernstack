const Notes = require("../models/notesModel");
const asyncHandler = require("express-async-handler");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Notes.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(notes);
});

const createNotes = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  const note = new Notes({ user: req.user._id, title, content });
  const created = await note.save();
  res.status(201).json(created);
});

const getById = asyncHandler(async (req, res) => {
  const note = await Notes.findById(req.params.id);

  if (note) {
    res.status(201).json(note);
  }
  if (!note) {
    res.status(404).json({ message: "Not found" });
  }
});

const updateNotes = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const note = await Notes.findById(req.params.id);
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cant perform this action");
  }
  if (note) {
    note.title = title || note.title;
    note.content = content || note.content;
    const update = await note.save();
    res.json(update);
  }
  if (!note) {
    res.status(404);
    throw new Error("Not found");
  }
});

const deleteNotes = asyncHandler(async (req, res) => {
  const note = await Notes.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cant perform this action");
  }
  if (note) {
    await note.remove();
    res.json({ message: "Note removed" });
  }
  if (!note) {
    res.status(404);
    throw new Error("Not found");
  }
});
module.exports = { getNotes, createNotes, getById, updateNotes, deleteNotes };
