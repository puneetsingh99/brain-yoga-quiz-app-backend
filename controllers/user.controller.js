const { User } = require("../models/user.model");
const { errorResponse } = require("../utils");

const addUser = async (req, res) => {
  try {
    const user = req.body;
    const newUser = new User(user);
    const createdUser = await newUser.save();
    createdUser.__v = undefined;

    return res.status(201).json({
      success: true,
      message: "User added successfully",
      createdUser,
    });
  } catch (error) {
    return errorResponse(res, "Could not add the user", error);
  }
};

module.exports = { addUser };
