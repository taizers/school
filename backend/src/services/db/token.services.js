const jwt = require('jsonwebtoken');

const db = require('../../db/models/index');

const Token = db.Token;
const User = db.User;

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
      expiresIn: '2h',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
      expiresIn: '10d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_KEY);
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_KEY);
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const token = await Token.findOrCreate({ where: { user_id: userId }, defaults: { user_id: userId, refreshtoken: refreshToken } });

    if (token) {
      return await Token.update(
        { refreshtoken: refreshToken },
        { where: { user_id: userId } }
      );
    }
  }

  async removeToken(refreshToken) {
    await Token.destroy({ where: { refreshtoken: refreshToken } });
  }

  async findToken(refreshToken) {
    return await Token.findOne({ where: { refreshtoken: refreshToken } });
  }
}

module.exports = new TokenService();
