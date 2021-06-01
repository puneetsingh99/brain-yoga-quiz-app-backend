const { Quiz } = require("../models/quiz.model");
const { successResponse, errorResponse } = require("../utils");

const addQuiz = async (req, res) => {
  try {
    const quiz = req.body;
    const newQuiz = new Quiz(quiz);
    const addedQuiz = await newQuiz.save();
    addedQuiz.__v = undefined;
    return successResponse(
      res,
      { message: "Quiz added successfully", addedQuiz },
      201
    );
  } catch (error) {
    return errorResponse(res, "Could not add the quiz", error);
  }
};

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({}).select("-__v");
    return successResponse(res, {
      message: "Quizzes retrieved successfully",
      quizzes,
    });
  } catch (error) {
    return errorResponse(res, "Could not retrieve quizzes", error);
  }
};

const deleteAllQuizzes = async (req, res) => {
  try {
    await Quiz.deleteMany({});
    return successResponse(res, { message: "Quizzes deleted successfully" });
  } catch (error) {
    return errorResponse(res, "Could not delete quizzes", error);
  }
};

module.exports = { addQuiz, getAllQuizzes, deleteAllQuizzes };
