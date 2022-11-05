import { NextFunction, Response } from 'express';
import {
  findPaginatedUsers,
  findUser,
  findUsers,
  updateUser,
} from '../services/db/users.services';
import { createUser } from '../services/db/auth.services';
import { customResponse } from '../helpers/responce';
import logger from '../helpers/logger';
import { Op } from 'sequelize';
import { UnProcessableEntityError } from '../helpers/error';
import {
  SearchMembersRequest,
  createUserRequest,
  GetUsersRequest,
} from '../types/requests/users.request.type';
import { ParamsIdRequest } from '../types/requests/global.request.type';
import uuid = require('uuid');

export const getUserAction = async (
  req: ParamsIdRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  logger.info(`Get User Action: { id: ${id} } `);

  try {
    const users: any = await findUser({ id });

    return customResponse(res, 200, users);
  } catch (err) {
    logger.error('Get User Action - Cannot get users', err);
    next(err);
  }
};

export const getUsersAction = async (
  req: GetUsersRequest,
  res: Response,
  next: NextFunction
) => {
  const { page, limit } = req.query;

  logger.info(`Get User Action: { page: ${page}, limit: ${limit} } `);

  try {
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
  const { role, post, username, group_id } = req.body;
  const { role: userRole } = req.user;

  logger.info(
    `Create User Action: { userRole: ${userRole}, role: ${role}, post: ${post}, username: ${username}, group_id: ${group_id} }`
  );

  try {
    if (userRole !== 'admin') {
      throw new Error('У вас нет доступа');
    }

    const activationkey = await uuid.v4();

    await createUser({
      role,
      username,
      post,
      group_id,
      activationkey,
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
    return next(new UnProcessableEntityError('File Not Found'));
  }
  const { id } = req.user;
  const { path } = req.file;

  logger.info(
    `Upload User Avatar Action: { userId: ${id}, path: ${path} } `
  );

  try {
    const user = await updateUser(id, { avatar: path });

    return customResponse(res, 200, user);
  } catch (err) {
    logger.error('Upload User Avatar Action - Cannot get users', err);
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
