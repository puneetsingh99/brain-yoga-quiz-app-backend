const jwt = require("jsonwebtoken");
const { User } = require("./models/user.model");

const generateToken = (payload, secret) => {
  const token = jwt.sign(payload, secret, { expiresIn: "24h" });
  return token;
};

const successResponse = (res, { message, ...params }, status = 200) => {
  console.log("inside successResponse utility");
  const response = {
    success: true,
    message,
    ...params,
  };
  return res.status(status).json(response);
};

const errorResponse = (res, message, error) => {
  console.log("inside errorResponse utility");
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

const updateTopScorers = ({ existingTopScorers, challengerId, challenger }) => {
  const topScorersList = [...existingTopScorers];
  const length = topScorersList.length;

  if (length === 0) {
    topScorersList.push({
      user: challengerId,
      rank: 1,
      score: challenger.score,
      timeTaken: challenger.timeTaken,
    });
    return topScorersList;
  }

  for (let i = 0; i < topScorersList.length; i++) {
    const updateRank = doUpdateStats(topScorersList[i], challenger);
    if (updateRank) {
      challenger.rank = i + 1;
      if (String(topScorersList[i].user) === challengerId) {
        topScorersList[i].rank = challenger.rank;
        topScorersList[i].score = challenger.score;
        topScorersList[i].timeTaken = challenger.timeTaken;
      } else {
        topScorersList.splice(i, 0, {
          user: challengerId,
          rank: challenger.rank,
          score: challenger.score,
          timeTaken: challenger.timeTaken,
        });
      }

      for (let j = i + 1; j <= length; j++) {
        if (topScorersList[j]) {
          topScorersList[j].rank = topScorersList[j].rank + 1;
        }
      }
      break;
    }
  }

  if (length === 5) {
    topScorersList.pop();
  }

  return topScorersList;
};

module.exports = {
  generateToken,
  errorResponse,
  successResponse,
  updateTopScorers,
  doUpdateStats,
};
