const express = require("express");
const {
  postAnswer,
  getAnswersForQuestion,
  deleteAnswer,
  updateAnswer,
} = require("../controller/answerController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Post an answer for a specific question
router.post("/", authMiddleware, postAnswer);

// Get all answers for a specific question
router.get("/:questionid", authMiddleware, getAnswersForQuestion);

// Delete answer
router.delete("/:questionid", authMiddleware, deleteAnswer);

// Update an answer
router.patch("/:questionid", authMiddleware, updateAnswer);

module.exports = router;
