const express = require("express");
const quizRouter = express.Router();
const { addQuiz, getAllQuizzes } = require("../controllers/quiz.controller");

quizRouter.route("/").get(getAllQuizzes).post(addQuiz);

module.exports = { quizRouter };
