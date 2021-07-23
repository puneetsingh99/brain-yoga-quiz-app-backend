const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { initializeDbConnection } = require("./db/db");
const { quizRouter } = require("./routers/quiz.router");
const { userRouter } = require("./routers/user.router");
const { routeNotFound } = require("./middlewares/route-not-found.middleware");
const { errorHandler } = require("./middlewares/error-handler.middleware");
const { login } = require("./controllers/auth.controller");
const { loginHandler } = require("./middlewares/login.middleware");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

initializeDbConnection();

app.use("/quiz", quizRouter);
app.use("/user", userRouter);
app.use("/login", loginHandler, login);

// NOTE: Do not move
app.use(routeNotFound);
app.use(errorHandler);

app.listen(process.env.PORT || PORT, () =>
  console.log(`The server is running at port ${process.env.PORT || PORT}`)
);
