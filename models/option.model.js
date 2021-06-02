const mongoose = require("mongoose");

const OptionSchema = mongoose.Schema({
  option: {
    type: String,
    trim: true,
    required: [true, "option cannot be empty"],
  },
  isCorrect: {
    type: Boolean,
    required: [true, "isCorrect field cannot be empty"],
  },
});

//remove Option model later if there is no use for it.
const Option = mongoose.model("Option", OptionSchema);

module.exports = { OptionSchema, Option };
