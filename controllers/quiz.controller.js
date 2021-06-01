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

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({}).select("-__v");
    return res.status(200).json({
      success: true,
      message: "Quizzes retrieved successfully",
      quizzes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not retrieve quizzes",
      errorMessage: error.message,
    });
  }
};

module.exports = { addQuiz, getAllQuizzes };
