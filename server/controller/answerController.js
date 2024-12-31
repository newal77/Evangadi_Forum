const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function postAnswer(req, res) {
  const { questionid, answer } = req.body;
  const userid = req.user.userid;

  if (!questionid || !answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide answer" });
  }

  try {
    await dbConnection.query(
      "INSERT INTO answers ( userid, questionid, answer) VALUES ( ?, ?, ?)",
      [userid, questionid, answer]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Answer posted successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

async function getAnswersForQuestion(req, res) {
  const { questionid } = req.params;

  try {
    const [answers] = await dbConnection.query(
      "SELECT users.username, answers.answer, answers.answerid FROM users JOIN answers ON answers.userid = users.userid WHERE answers.questionid = ?",
      [questionid]
    );

    if (answers.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "No answers found for this question.",
      });
    }

    return res.status(StatusCodes.OK).json({ answers });
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

async function deleteAnswer(req, res) {
  const { questionid } = req.params;
  const { answerid } = req.body;
  const userid = req.user.userid;
  try {
    const [rows] = await dbConnection.query(
      "SELECT * FROM answers WHERE questionid = ? AND userid = ? AND answerid = ?",
      [questionid, userid, answerid]
    );

    if (rows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "No answer found with the provided details.",
      });
    }

    // Delete the specific answer
    await dbConnection.query(
      "DELETE FROM answers WHERE questionid = ? AND userid = ? AND answerid = ?",
      [questionid, userid, answerid]
    );

    return res
      .status(StatusCodes.OK)
      .json({ message: "Answer deleted successfully." });
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

async function updateAnswer(req, res) {
  const { questionid } = req.params;
  const { answer } = req.body; // Updated answer text
  const userid = req.user.userid; // Get user ID from authenticated user

  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Answer text is required." });
  }

  try {
    // Update the answer
    await dbConnection.query(
      "UPDATE answers SET answer = ? WHERE questionid = ? AND userid = ?",
      [answer, questionid, userid]
    );

    return res
      .status(StatusCodes.OK)
      .json({ message: "Answer updated successfully." });
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

module.exports = {
  postAnswer,
  getAnswersForQuestion,
  deleteAnswer,
  updateAnswer,
};
