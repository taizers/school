const ApiError = require('../exceptions/api.errors');

module.exports = (error, req, res, next) => {
  console.log(error);
  if (error instanceof ApiError) {
    return res
      .status(error.status)
      .json({ message: error.message, errors: error.errors });
  }

  return res
    .status(500)
    .json({ message: `Непредвиденная ошибка: ${error.message}` });
};
