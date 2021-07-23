const { Quiz } = require("../models/quiz.model");
const { successResponse, errorResponse } = require("../utils");
const { extend } = require("lodash");

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
    const quizzes = await Quiz.find({}).select("-__v -createdAt -updatedAt");
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

const quizIdCheck = async (req, res, next, quizId) => {
  try {
    const quiz = await Quiz.findOne({ _id: quizId })
      .select("-__v -createdAt -updatedAt")
      .populate("topScorers.user", "username");
    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }
    req.quizId = quizId;
    req.quiz = quiz;
    next();
  } catch (error) {
    return errorResponse(res, "Could not retrieve quiz", error);
  }
};

const getQuiz = (req, res) => {
  const { quiz } = req;
  return successResponse(res, { message: "Quiz retrieved successfully", quiz });
};

const updateQuiz = async (req, res) => {
  try {
    const updateData = req.body;
    let quizToBeUpdated = await Quiz.findOne({ _id: req.quizId });
    quizToBeUpdated = extend(quizToBeUpdated, updateData);
    const updatedQuiz = await quizToBeUpdated.save();
    updatedQuiz.__v = undefined;
    successResponse(res, { message: "Quiz updated successfully", updatedQuiz });
  } catch (error) {
    return errorResponse(res, "Could not update the quiz", error);
  }
};

const deleteQuiz = async (req, res) => {
  try {
    await Quiz.deleteOne({ _id: req.quizId });
    successResponse(res, { message: "Quiz deleted successfully" });
  } catch (error) {
    return errorResponse(res, "Could not delete the quiz", error);
  }
};

module.exports = {
  addQuiz,
  getAllQuizzes,
  deleteAllQuizzes,
  quizIdCheck,
  getQuiz,
  updateQuiz,
  deleteQuiz,
};
