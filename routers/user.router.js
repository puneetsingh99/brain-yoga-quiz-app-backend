const express = require("express");
const { addUser } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.route("/").post(addUser);

module.exports = { userRouter };
