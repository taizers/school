import { NextFunction, Response } from 'express';
import bcrypt from 'bcrypt';
import { login, refresh, logout } from '../services/db/auth.services';
import { customResponse } from '../helpers/responce';
import { getUser, updateUser } from '../services/db/users.services';
import {
  signUpRequest,
  loginRequest,
  requestWithCookiesToken,
} from '../types/requests/auth.request.type';
import { UserSessionType } from '../types/entities/global.entities.type';
import logger from '../helpers/logger';

export const signUpAction = async (
  req: signUpRequest,
  res: Response,
  next: NextFunction
) => {
  const { email, password, activationkey, username } = req.body;

  logger.info(
    `SignUp Action: { password: ${password}, email: ${email}, activationkey: ${activationkey}, username: ${username} }`
  );

  let user;

  try {
    user = await getUser({ activationkey });
  } catch (err) {
    logger.error('SignUp Action - Cannot find user', err);
    return next(err);
  }

  if (user.password !== null) {
    logger.info(`SignUp Action - User already exists`);
    return customResponse(res, 422, {
      code: 422,
      message: 'Пользователь уже зарегистрировался',
    });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    user = await updateUser(user.id, {
      email,
      password: encryptedPassword,
      username,
    });

    return customResponse(res, 201, 'создано');
  } catch (err) {
    logger.error('SignUp Action - Cannot create user', err);
    next(err);
  }
};

export const loginAction = async (
  req: loginRequest,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  logger.info(`Login Action: { email: ${email}, password: ${password} }`);

  try {
    const userSession: { user_session: UserSessionType } = await login(
      email,
      password
    );

    res.cookie('refresh_token', userSession.user_session.refresh_token, {
      maxAge: Number(process.env.JWT_REFRESH_MAX_AGE) * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development' ? false : true,
    });

    return customResponse(res, 200, userSession);
  } catch (err) {
    logger.error('Login Action - Cannot find user', err);
    next(err);
  }
};

export const refreshAction = async (
  req: requestWithCookiesToken,
  res: Response,
  next: NextFunction
) => {
  const refresh_token = req.cookies.refresh_token;

  logger.info(`Refresh Action: { refresh_token: ${refresh_token} }`);

  try {
    const userSession: any = await refresh(refresh_token);

    res.cookie('refresh_token', userSession.user_session.refresh_token, {
      maxAge: Number(process.env.JWT_REFRESH_MAX_AGE) * 1000,
      httpOnly: true,
      secure: false,
    });

    return customResponse(res, 200, userSession);
  } catch (err) {
    logger.error('Refresh Action - Cannot refresh', err);
    next(err);
  }
};

export const logoutAction = async (
  req: requestWithCookiesToken,
  res: Response,
  next: NextFunction
) => {
  const refresh_token = req.cookies.refresh_token;

  logger.info(`Logout Action: { refresh_token: ${refresh_token} }`);

  try {
    await logout(refresh_token);

    return customResponse(res, 200, { success: true });
  } catch (err) {
    logger.error('Logout Action - Cannot logout', err);
    next(err);
  }
};
