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

//TODO:Do not return sensitive info of the user in the final version

userRouter.route("/").get(getAllUser).post(signup).delete(deleteAllUser);
//TODO: remove delete route from the final version

userRouter.use(verifyAuth);

userRouter.param("userId", userIdCheck);

userRouter.route("/:userId").get(getUser).post(updateUser).delete(deleteUser);

userRouter
  .route("/:userId/my-quiz")
  .get(getUserCreatedQuizzes)
  .post(addUserCreatedQuiz)
  .delete(deleteUserCreatedQuizzes);
//TODO:remove delete route before final deployment

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
//TODO:remove delete route before final deployment

userRouter.param("quizId", quizIdCheck);

userRouter.route("/:userId/quiz-taken/:quizId").get(getQuizTakenByUser);

module.exports = { userRouter };
