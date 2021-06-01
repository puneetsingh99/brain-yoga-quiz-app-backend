const express = require("express");
const quizRouter = express.Router();
const {
  addQuiz,
  getAllQuizzes,
  deleteAllQuizzes,
  quizIdCheck,
  getQuiz,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quiz.controller");

quizRouter.route("/").get(getAllQuizzes).post(addQuiz).delete(deleteAllQuizzes);
//TODO: remove delete route from the final version

quizRouter.param("quizId", quizIdCheck);
quizRouter.route("/:quizId").get(getQuiz).post(updateQuiz).delete(deleteQuiz);

module.exports = { quizRouter };
