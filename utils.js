const errorResponse = (res, message, error) => {
  console.log("inside errorResponse utility");
  const response = {
    success: false,
    message,
    errorMessage: error.message,
  };

  return res.status(500).json(response);
};

module.exports = { errorResponse };
