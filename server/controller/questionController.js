const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

const { v4: uuidv4 } = require("uuid");

async function askQuestion(req, res) {
  const { title, description } = req.body;
  const questionid = uuidv4();
  const userid = req.user.userid;

  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields" });
  }

  try {
    await dbConnection.query(
      "INSERT INTO questions (questionid, userid, title, description) VALUES (?, ?, ?, ?)",
      [questionid, userid, title, description]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Question created successfully" });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred" });
  }
}

async function getAllQuestions(req, res) {
  try {
    const [questions] = await dbConnection.query(
      `SELECT users.userid, users.username, questions.title,questions.questionid, questions.description FROM users JOIN questions ON users.userid = questions.userid ORDER BY id DESC;`
    );

    if (questions.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No questions found." });
    }

    res.status(StatusCodes.OK).json({ questions });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred." });
  }
}

async function getSingleQuestion(req, res) {
  const { questionid } = req.params;

  try {
    const [question] = await dbConnection.query(
      `SELECT users.username, questions.title, questions.questionid, questions.description 
      FROM users 
      JOIN questions ON users.userid = questions.userid 
      WHERE questions.questionid = ?;
    `,
      [questionid]
    );

    if (question.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "The requested question could not be found." });
    }

    res.status(StatusCodes.OK).json({ question: question[0] });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred." });
  }
}

async function deleteQuestion(req, res) {
  const { questionid } = req.params;

  try {
    await dbConnection.query("DELETE FROM questions WHERE questionid = ?", [
      questionid,
    ]);
    res.status(StatusCodes.OK).json({ msg: "Question deleted successfully." });
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "An unexpected error occurred while deleting the question.",
    });
  }
}

module.exports = {
  askQuestion,
  getAllQuestions,
  getSingleQuestion,
  deleteQuestion,
};
