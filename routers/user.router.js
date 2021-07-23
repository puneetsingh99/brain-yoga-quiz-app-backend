const express = require("express");
const { quizIdCheck } = require("../controllers/quiz.controller");
const {
  getAllUser,
  deleteAllUser,
  userIdCheck,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const { signup } = require("../controllers/auth.controller");

const {
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
} = require("../controllers/userQuiz.controller");
const { verifyAuth } = require("../middlewares/verify-auth.middleware");

const userRouter = express.Router();

userRouter.route("/").get(getAllUser).post(signup);
// .delete(deleteAllUser);

userRouter.use(verifyAuth);

userRouter.param("userId", userIdCheck);

userRouter.route("/:userId").get(getUser).post(updateUser);
// .delete(deleteUser);

userRouter
  .route("/:userId/my-quiz")
  .get(getUserCreatedQuizzes)
  .post(addUserCreatedQuiz)
  .delete(deleteUserCreatedQuizzes);

userRouter.param("userCreatedQuizId", userCreatedQuizIdCheck);

userRouter
  .route("/:userId/my-quiz/:userCreatedQuizId")
  .get(getUserCreatedQuiz)
  .delete(deleteUserCreatedQuiz);

userRouter
  .route("/:userId/quiz-taken")
  .get(getQuizzesTakenByUser)
  .post(addOrUpdateQuizTakenByUser)
  .delete(deleteQuizzesTakenByUser);

userRouter.param("quizId", quizIdCheck);

userRouter.route("/:userId/quiz-taken/:quizId").get(getQuizTakenByUser);

module.exports = { userRouter };
