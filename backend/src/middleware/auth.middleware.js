const ApiError = require('../exceptions/api.errors');
const tokenService = require('../services/db/token.services');

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(ApiError.UnAutorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
      return next(ApiError.UnAutorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.UnAutorizedError());
    }

    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnAutorizedError());
  }
};

module.exports = verifyToken;
