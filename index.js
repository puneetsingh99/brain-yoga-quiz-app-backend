const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { initializeDbConnection } = require("./db/db");
const { quizRouter } = require("./routers/quiz.router");
const { userRouter } = require("./routers/user.router");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

initializeDbConnection();

app.use("/quiz", quizRouter);
app.use("/user", userRouter);

app.use("/", (req, res) => res.send("Brain Yoga quiz app APIs"));

app.listen(PORT, () => console.log(`The server is running at port ${PORT}`));
