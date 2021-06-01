const express = require("express");
const {
  addUser,
  getAllUsers,
  deleteAllUser,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(addUser).delete(deleteAllUser);

module.exports = { userRouter };
