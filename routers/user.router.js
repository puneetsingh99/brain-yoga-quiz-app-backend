const express = require("express");
const {
  addUser,
  getAllUsers,
  deleteAllUser,
  userIdCheck,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(addUser).delete(deleteAllUser);
//TODO: remove delete route from the final version

userRouter.param("userId", userIdCheck);

userRouter.route("/:userId").get(getUser).post(updateUser).delete(deleteUser);

module.exports = { userRouter };
