const mongoose = require("mongoose");
const { QuizSchema } = require("./quiz.model");
const { QuizTakenSchema } = require("./quizTaken.model");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name field of the user cannot be empty"],
    },
    username: {
      type: String,
      required: [true, "username field of the user cannot be empty"],
    },
    password: {
      type: String,
      required: [true, "password field of the user cannot be empty"],
    },
    userCreatedQuizzes: [QuizSchema],
    quizzesTaken: [QuizTakenSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = { UserSchema, User };
