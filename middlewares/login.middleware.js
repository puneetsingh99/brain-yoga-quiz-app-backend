const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");

const loginHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      return res.json({
        success: false,
        message: "Please enter username and password",
      });
    }

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const validPassword = bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }
    req.login = "successful";
    req.userId = user._id;
    req.username = user.username;
    req.quizzesTaken = user.quizzesTaken;
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Cannot login",
      errorMessage: error.message,
    });
  }
};

module.exports = { loginHandler };
