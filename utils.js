const jwt = require("jsonwebtoken");
const { User } = require("./models/user.model");

const generateToken = (payload, secret) => {
  const token = jwt.sign(payload, secret, { expiresIn: "24h" });
  return token;
};

const successResponse = (res, { message, ...params }, status = 200) => {
  const response = {
    success: true,
    message,
    ...params,
  };
  return res.status(status).json(response);
};

const errorResponse = (res, message, error) => {
  const response = {
    success: false,
    message,
    errorMessage: error.message,
  };

  return res.status(500).json(response);
};

const doUpdateStats = (existingStat, newStat) => {
  const isChallengerHigherScorer = existingStat.score < newStat.score;
  const isChallengerEqualScorer = existingStat.score === newStat.score;
  const isChallengerQuicker = existingStat.timeTaken > newStat.timeTaken;

  const updateRank =
    isChallengerHigherScorer ||
    (isChallengerEqualScorer && isChallengerQuicker);

  return updateRank;
};

const removeDuplicateUsers = (leaderBoard) => {
  const leaderBoardCopy = [...leaderBoard];

  console.log("remove duplicate users from this");
  console.log(leaderBoardCopy);

  const uniqueUserIds = Array.from(
    new Set(leaderBoardCopy.map((user) => String(user.user)))
  );

  console.log("unique user ids");
  console.log(uniqueUserIds);

  const uniqueUsers = uniqueUserIds.map((userId) =>
    leaderBoardCopy.find((user) => String(user.user) === String(userId))
  );
  return uniqueUsers;
};

const sortOnScoreAndTimeTaken = (user1, user2) => {
  if (user1.score > user2.score) {
    return -1;
  }
  if (user1.score === user2.score && user1.timeTaken < user2.timeTaken) {
    return -1;
  }
  return 0;
};

const updateLeaderBoard = ({
  existingLeaderBoard,
  challengerId,
  challengerStats,
}) => {
  const newLeaderBoard = [
    ...existingLeaderBoard,
    {
      user: challengerId,
      score: challengerStats.score,
      timeTaken: challengerStats.timeTaken,
    },
  ];

  if (newLeaderBoard.length === 1) {
    newLeaderBoard[0].rank = 1;
    return newLeaderBoard;
  }

  newLeaderBoard.sort(sortOnScoreAndTimeTaken);

  const uniqueLeaderBoard = removeDuplicateUsers(newLeaderBoard);

  uniqueLeaderBoard.length > 5 && uniqueLeaderBoard.pop();

  const leaderBoardWithRanks = uniqueLeaderBoard.map((user, index) => ({
    user: user.user,
    rank: index + 1,
    score: user.score,
    timeTaken: user.timeTaken,
  }));

  return leaderBoardWithRanks;
};

module.exports = {
  generateToken,
  errorResponse,
  successResponse,
  updateLeaderBoard,
  doUpdateStats,
};
