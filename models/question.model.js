const mongoose = require("mongoose");
const { OptionSchema } = require("./option.model");

const QuestionSchema = mongoose.Schema({
  question: {
    type: String,
    trim: true,
    required: [true, "question field cannot be empty"],
  },
  options: [OptionSchema],
  image: {
    type: String,
  },
});

//remove Question model later if there is no use for it.
const Question = mongoose.model("Question", QuestionSchema);

module.exports = { QuestionSchema, Question };
