const express = require("express");
const quizRouter = express.Router();
const { addQuiz } = require("../controllers/quiz.controller");

quizRouter
  .route("/")
  .get(async (req, res) => res.send("get works"))
  .post(addQuiz)
  .delete(async (req, res) => res.send("delete works"));

module.exports = { quizRouter };
