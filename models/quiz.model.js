const mongoose = require("mongoose");
const { QuestionSchema } = require("./question.model");
const { TopScorerSchema } = require("./topscorer.model");

const QuizSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for the quiz"],
    },
    image: {
      type: String,
    },
    timelimit: {
      type: Number,
      required: [true, "Please provide the duration of the quiz"],
    },
    score: {
      type: Number,
      required: [true, "Please provide the score for correct answer"],
    },
    negativeScore: {
      type: Number,
    },
    questions: [QuestionSchema],
    createdBy: {
      type: String,
      trim: true,
      required: true,
      default: "admin",
    },
    topScorers: [TopScorerSchema],
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = { Quiz, QuizSchema };
