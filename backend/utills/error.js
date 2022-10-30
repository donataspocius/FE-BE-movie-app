const serverErrorHandler = (error, res, statusCode, message) => {
  console.log(error);
  res.status(statusCode).json(message);
};
module.exports = serverErrorHandler;
