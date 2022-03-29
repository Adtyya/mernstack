const express = require("express");
const {
  getNotes,
  createNotes,
  getById,
  updateNotes,
  deleteNotes,
} = require("../controllers/notesController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNotes);
router
  .route("/:id")
  .get(getById)
  .put(protect, updateNotes)
  .delete(protect, deleteNotes);

module.exports = router;
