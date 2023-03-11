import { NextFunction, Request, Response } from 'express';
import {
  findPaginatedUsers,
  findUser,
  findUsers,
  findUserExcludePassword,
  getUser,
  updateUser,
  deleteUser,
} from '../services/db/users.services';
import { createUser } from '../services/db/auth.services';
import { customResponse } from '../helpers/responce';
import logger from '../helpers/logger';
import { Op } from 'sequelize';
import {
  BadCredentialsError,
  DontHaveAccessError,
  UnProcessableEntityError,
} from '../helpers/error';
import {
  SearchMembersRequest,
  createUserRequest,
  GetUsersRequest,
} from '../types/requests/users.request.type';
import { ParamsIdRequest } from '../types/requests/global.request.type';
import uuid = require('uuid');
import bcrypt from 'bcrypt';

export const getUserAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { role: userRole } = req.user;

  logger.info(`Get User Action: { id: ${id}, userRole: ${userRole} } `);

  try {
    let user: any;

    if (userRole !== 'admin') {
      user = await findUser({ id });
    } else {
      user = await findUserExcludePassword({ id });
    }

    return customResponse(res, 200, user);
  } catch (err) {
    logger.error('Get User Action - Cannot get users', err);
    next(err);
  }
};

export const getCEOAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('Get CEO Action');

  try {
    const user = await findUser({ post: 'Директор' });

    return customResponse(res, 200, user);
  } catch (err) {
    logger.error('Get CEO Action - Cannot CEO users', err);
    next(err);
  }
};

export const getUsersAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { page, limit } = req.query;
  const { role: userRole } = req.user;

  logger.info(`Get User Action: { page: ${page}, limit: ${limit} } `);

  try {
    if (userRole !== 'admin') {
      throw new Error('У вас нет доступа');
    }

    const users = await findPaginatedUsers(Number(page) - 1, Number(limit));

    return customResponse(res, 200, users);
  } catch (err) {
    logger.error('Get User Action - Cannot get users', err);
    next(err);
  }
};

export const createUserAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { role, post, username, group_id, activationkey, phone } = req.body;
  const { role: userRole } = req.user;

  logger.info(
    `Create User Action: { userRole: ${userRole}, role: ${role}, post: ${post}, phone: ${phone}, username: ${username}, group_id: ${group_id}, activationkey: ${activationkey} }`
  );

  try {
    if (userRole !== 'admin') {
      throw new Error('У вас нет доступа');
    }

    const key = await uuid.v4();

    await createUser({
      role,
      username,
      post,
      phone,
      group_id,
      activationkey: activationkey || key,
    });

    return customResponse(res, 201, 'created');
  } catch (err) {
    logger.error('Create User Action - Cannot create user', err);
    next(err);
  }
};

export const uploadUserAvatarAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return next(new UnProcessableEntityError('Файл не найден'));
  }
  const { id } = req.user;
  const { path } = req.file;

  logger.info(`Upload User Avatar Action: { userId: ${id}, path: ${path} } `);

  try {
    const user = await updateUser(id, { avatar: path });

    return customResponse(res, 200, user);
  } catch (err) {
    logger.error('Upload User Avatar Action - Cannot get users', err);
    next(err);
  }
};

export const deleteUserAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { id: userId, role: userRole } = req.user;

  logger.info(
    `Delete User Action: { id: ${id}, userId: ${userId}, userRole: ${userRole} }`
  );

  try {
    if (userRole !== 'admin') {
      throw new DontHaveAccessError();
    }

    if (id === userId) {
      throw new Error('Вы не можете удалить себя');
    }

    await deleteUser(id);

    return customResponse(res, 200, { id });
  } catch (err) {
    logger.error('delete User Action - Cannot delete user', err);
    next(err);
  }
};

export const updateUserAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { role: userRole } = req.user;
  const { post, role, username, group_id, activationkey } = req.body;

  logger.info(
    `Update User Action: { userId: ${id}, post: ${post}, role: ${role}, username: ${username}, group_id: ${group_id}, activationkey: ${activationkey} } `
  );

  try {
    if (userRole !== 'admin') {
      throw new DontHaveAccessError();
    }
    const user = await updateUser(id, {
      post,
      role,
      username,
      group_id,
      activationkey,
    });

    return customResponse(res, 200, user);
  } catch (err) {
    logger.error('update User Action - Cannot update user', err);
    next(err);
  }
};

export const updateUserProfileAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user;
  const { username, new_password, old_password } = req.body;


  logger.info(`Update User Action: { userId: ${id}, username: ${username} } `);

  try {
    let password;
    let avatar;

    if (new_password && old_password) {
      const oldUser = await getUser({ id });

      const isPasswordsEqual = await bcrypt.compare(
        old_password,
        oldUser.password
      );

      if (!isPasswordsEqual) {
        throw new BadCredentialsError('Неверный пароль');
      }

      password = await bcrypt.hash(new_password, 10);
    }

    if (req.file) {
      avatar = req.file.path;
    }

    const user = await updateUser(id, {
      username,
      password,
      avatar,
    });

    return customResponse(res, 200, user);
  } catch (err) {
    logger.error('update User Action - Cannot update user', err);
    next(err);
  }
};

export const searchMembersAction = async (
  req: SearchMembersRequest,
  res: Response,
  next: NextFunction
) => {
  const { query } = req.query;

  logger.info(`Search Members Action: { query: ${query} } `);

  try {
    const users = await findUsers({ username: { [Op.substring]: query } });

    return customResponse(res, 200, users);
  } catch (err) {
    logger.error('Search Members Action - Cannot get user', err);
    next(err);
  }
};
