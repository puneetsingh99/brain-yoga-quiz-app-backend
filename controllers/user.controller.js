const { User } = require("../models/user.model");
const { successResponse, errorResponse } = require("../utils");
const { extend } = require("lodash");

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

const userIdCheck = async (req, res, next, id) => {
  try {
    const user = await User.findOne({ _id: id }).select("-__v");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    req.id = id;
    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, "User not found", error);
  }
};

const getUser = async (req, res) => {
  const { user } = req;
  return successResponse(res, { message: "User retrieved successfully", user });
};

const updateUser = async (req, res) => {
  try {
    const updateData = req.body;
    let userToBeUpdated = await User.findOne({ _id: req.id });
    userToBeUpdated = extend(userToBeUpdated, updateData);
    const updatedUser = await userToBeUpdated.save();
    updatedUser.__v = undefined;

    return successResponse(res, {
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    return errorResponse(res, "Could not update the user", error);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.id });
    return successResponse(res, {
      message: "User deleted successfully",
    });
  } catch (error) {
    return errorResponse(res, "Could not delete the user", error);
  }
};

module.exports = {
  addUser,
  getAllUsers,
  deleteAllUser,
  userIdCheck,
  getUser,
  updateUser,
  deleteUser,
};
