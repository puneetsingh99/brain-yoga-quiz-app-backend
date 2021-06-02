const mongoose = require("mongoose");

const QuizTakenSchema = mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: [true, "quizId field is mandatory"],
  },
  score: {
    type: Number,
    required: [true, "quiz score cannot be empty"],
  },

  timeTaken: {
    type: Number,
    required: [true, "time taken to complete the quiz cannot be empty"],
  },
});

const QuizTaken = mongoose.model("QuizTaken", QuizTakenSchema);

module.exports = { QuizTakenSchema, QuizTaken };
