const mongoose = require("mongoose");

const TopScorerSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id of the quiz taker is required"],
  },
  rank: {
    type: Number,
    required: [true, "Rank of the quiz taker is required"],
  },
  score: {
    type: Number,
    required: [true, "Score is required"],
  },
  timeTaken: {
    type: Number,
    required: [true, "Time taken by the user is required"],
  },
});

module.exports = { TopScorerSchema };
