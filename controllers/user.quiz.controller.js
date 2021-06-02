const express = require("express");
const { successResponse, errorResponse } = require("../utils");
const { User } = require("../models/user.model");
const { extend } = require("lodash");

//quizzes created by user
const getUserCreatedQuizzes = (req, res) => {
  const userCreatedQuizzes = req.user.userCreatedQuizzes;
  return successResponse(res, {
    message: "User created quizzes retrieved successfully",
    userCreatedQuizzes,
  });
};

const addUserCreatedQuiz = async (req, res) => {
  try {
    const { userId } = req;
    const { userCreatedQuiz } = req.body;

    userCreatedQuiz.createdBy = userId;
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { userCreatedQuizzes: userCreatedQuiz } },
      { new: true }
    );

    return successResponse(res, {
      message: "Quiz added successfully",
      updatedUser,
    });
  } catch (error) {
    return errorResponse(res, "Could not add quiz", error);
  }
};

const deleteUserCreatedQuizzes = async (req, res) => {
  try {
    const { userId } = req;
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { userCreatedQuizzes: [] },
      { new: true }
    );

    return successResponse(res, {
      message: "Quizzes deleted successfully",
      updatedUser,
    });
  } catch (error) {
    return errorResponse(res, "Could not delete the quizzes", error);
  }
};

const userCreatedQuizIdCheck = async (req, res, next, quizId) => {
  try {
    const { user } = req;
    const userCreatedQuiz = user.userCreatedQuizzes.find(
      (userCreatedQuiz) => String(userCreatedQuiz._id) === quizId
    );
    if (!userCreatedQuiz) {
      return res
        .status(404)
        .json({ success: false, message: "User created quiz not found" });
    }
    req.userCreatedQuiz = userCreatedQuiz;
    req.quizId = quizId;
    next();
  } catch (error) {
    return errorResponse(res, "Could not retrieve quiz", error);
  }
};

const getUserCreatedQuiz = async (req, res) => {
  const { userCreatedQuiz } = req;
  return successResponse(res, {
    message: "User created quiz retrieved successfully",
    userCreatedQuiz,
  });
};

const deleteUserCreatedQuiz = async (req, res) => {
  try {
    const { userId, userCreatedQuiz } = req;
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { userCreatedQuizzes: userCreatedQuiz } },
      { new: true }
    );
    return successResponse(res, {
      message: "User created quiz deleted successfully",
      updatedUser,
    });
  } catch (error) {
    return errorResponse(res, "Could not delete the user created quiz", error);
  }
};

//quizzes taken by user
const getQuizzesTakenByUser = async (req, res) => {
  const { user } = req;
  const quizzesTaken = user.quizzesTaken;
  return successResponse(res, {
    message: "Quizzes taken by user retrieved successfully",
    quizzesTaken,
  });
};

const addOrUpdateQuizTakenByUser = async (req, res) => {
  try {
    const { userId, user } = req;
    const quizTakenByUser = req.body;
    const quizAlreadyExists = user.quizzesTaken.find(
      (quizTaken) => String(quizTaken.quiz._id) === quizTakenByUser.quiz
    );

    if (quizAlreadyExists) {
      let userToBeUpdated = await User.findOne({ _id: userId });
      userToBeUpdated.quizzesTaken.forEach((quizTaken) => {
        if (String(quizTaken.quiz._id) === quizTakenByUser.quiz) {
          quizTaken.score = quizTakenByUser.score;
          quizTaken.timeTaken = quizTakenByUser.timeTaken;
        }
      });

      const updatedUser = await userToBeUpdated.save();
      updatedUser.__v = undefined;

      return successResponse(res, {
        message: "Quiz taken by user updated successfully",
        updatedUser,
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { quizzesTaken: quizTakenByUser } },
      { new: true }
    );

    return successResponse(res, {
      message: "Quiz taken by user added successfully",
      updatedUser,
    });
  } catch (error) {
    return errorResponse(
      res,
      "Could not add/update quiz to quizTaken list",
      error
    );
  }
};

const deleteQuizzesTakenByUser = async (req, res) => {
  try {
    const { userId } = req;
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { quizzesTaken: [] },
      { new: true }
    );
    return successResponse(res, {
      message: "Quiz taken by user deleted successfully",
      updatedUser,
    });
  } catch (error) {
    return errorResponse(res, "Could not delete the quiz taken by user", error);
  }
};

const getQuizTakenByUser = async (req, res) => {
  const { user, quizId } = req;
  const quiz = user.quizzesTaken.find(
    (quizTaken) => String(quizTaken.quiz._id) === quizId
  );

  return successResponse(res, {
    message: "Quiz taken by user retrieved successfully",
    quiz,
  });
};

module.exports = {
  getUserCreatedQuizzes,
  addUserCreatedQuiz,
  deleteUserCreatedQuizzes,
  userCreatedQuizIdCheck,
  getUserCreatedQuiz,
  deleteUserCreatedQuiz,
  getQuizzesTakenByUser,
  addOrUpdateQuizTakenByUser,
  deleteQuizzesTakenByUser,
  getQuizTakenByUser,
};
