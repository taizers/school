const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('../mail.services');
const tokenService = require('./token.services');
const UserDto = require('../../dtos/user.dto');
const ApiError = require('../../exceptions/api.errors');

const db = require('../../db/models/index');

const User = db.User;

const getUserForResponceWithToken = async (user) => {
  const userDto = new UserDto(user);

  const tokens = tokenService.generateTokens({ ...userDto });

  await tokenService.saveToken(userDto.id, tokens.refreshToken);

  return { ...tokens, user: userDto };
};

class UserService {
  async signUp(email, password, name) {
    const candidate = await User.findOne({ where: { email: email } });

    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтой ${email} уже существует`
      );
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const activationLink = await uuid.v4();

    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
      activationlink: activationLink,
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/v1/auth/activate/${activationLink}`
    );

    return getUserForResponceWithToken(user);
  }

  async activate(activationLink) {
    const user = await User.findOne({
      where: { activationlink: activationLink },
    });

    if (!user) {
      throw ApiError.BadRequest(`Некорректная ссылка активации`);
    }

    if (user.isactivated) {
      throw ApiError.BadRequest(`Аккаунт уже активирован`);
    }

    await User.update({ isactivated: true }, { where: { id: user.id } });
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      throw ApiError.BadRequest(`Пользователь с почтой ${email} не найден`);
    }

    const isPasswordsEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordsEqual) {
      throw ApiError.BadRequest(`Неверный пароль`);
    }

    return getUserForResponceWithToken(user);
  }

  async logout(refreshToken) {
    await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnAutorizedError();
    }

    const userFormToken = tokenService.validateRefreshToken(refreshToken);
    const tokenFromBd = await tokenService.findToken(refreshToken);

    if (!userFormToken || !tokenFromBd || tokenFromBd.user_id !== userFormToken.id) {
      throw ApiError.UnAutorizedError();
    }
    const user = await User.findByPk(userFormToken.id);

    return getUserForResponceWithToken(user);
  }

  async getAllUsers() {
    const users = await User.findAll();

    const usersDto = users.map((user) => {
      const userDto = new UserDto(user);

      return { ...userDto };
    });

    return usersDto;
  }

  async getOneUser(userId) {
    const user = await User.findByPk(userId);
    return user;
  }

  async updateUser(name, password, oldPassword, userId) {
    const oldUser = await User.findByPk(userId);
    const updatingUserData = {};

    if (password && oldPassword) {
      const isPasswordEquals = await bcrypt.compare(
        oldPassword,
        oldUser.password
      );

      if (!isPasswordEquals) {
        throw ApiError.BadRequest(`Неверный пароль`);
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      updatingUserData.password = encryptedPassword;
    } else {
      updatingUserData.password = oldUser.password;
    }

    if (name) {
      updatingUserData.name = name;
    } else {
      updatingUserData.name = oldUser.name;
    }
    const user = await User.update(
      { name: updatingUserData.name, password: updatingUserData.password },
      { where: { id: userId } }
    );

    return getUserForResponceWithToken(user);
  }

  async deleteUser(userId) {
    await User.destroy({ where: { id: userId } });
  }
}

module.exports = new UserService();
