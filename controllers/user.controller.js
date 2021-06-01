const { User } = require("../models/user.model");
const { successResponse, errorResponse } = require("../utils");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-__v");
    return successResponse(res, {
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    return errorResponse(res, "Could not retrieve users", error);
  }
};

const addUser = async (req, res) => {
  try {
    const user = req.body;
    const newUser = new User(user);
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

const deleteAllUser = async (req, res) => {
  try {
    await User.deleteMany({});
    return successResponse(res, { message: "Users deleted successfully" });
  } catch (error) {
    return errorResponse(res, "Could not delete the users", error);
  }
};

module.exports = { addUser, getAllUsers, deleteAllUser };
