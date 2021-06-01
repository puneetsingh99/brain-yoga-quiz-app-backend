const express = require("express");
const quizRouter = express.Router();
const {
  addQuiz,
  getAllQuizzes,
  deleteAllQuizzes,
} = require("../controllers/quiz.controller");

quizRouter.route("/").get(getAllQuizzes).post(addQuiz).delete(deleteAllQuizzes);
//TODO: remove delete route from the final version

module.exports = { quizRouter };
