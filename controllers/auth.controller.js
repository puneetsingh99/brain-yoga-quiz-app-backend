const { User } = require("../models/user.model");
const { generateToken, successResponse, errorResponse } = require("../utils");
const bcrypt = require("bcrypt");

const SECRET = process.env.SECRET;

const login = (req, res) => {
  if (req.login === "successful") {
    const token = generateToken({ userId: req.userId }, SECRET);
    return successResponse(res, { message: "Login successful", token });
  } else {
    return res.status(500).json({ success: false, message: "Could not login" });
  }
};

const signup = async (req, res) => {
  try {
    const user = req.body;

    const userAlreadyExists = await User.findOne({ username: user.username });

    if (userAlreadyExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    const newUser = new User(user);

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    const createdUser = await newUser.save();
    createdUser.__v = undefined;

    return successResponse(
      res,
      { message: "User added successfully", createdUser },
      201
    );
  } catch (error) {
    return errorResponse(res, "Could not add the user", error);
  }
};

module.exports = { login, signup };
