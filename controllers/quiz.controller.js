const mongoose = require("mongoose");
const { Quiz } = require("../models/quiz.model");

const addQuiz = async (req, res) => {
  try {
    const quiz = req.body;
    const newQuiz = new Quiz(quiz);
    const addedQuiz = await newQuiz.save();
    addedQuiz.__v = undefined;

    return res
      .status(201)
      .json({ success: true, message: "quiz successfully added", addedQuiz });
  } catch (error) {
    return res.json({
      success: false,
      message: "Could not add the quiz",
      errorMessage: error.message,
    });
  }
};

module.exports = { addQuiz };
