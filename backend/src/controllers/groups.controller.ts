import { NextFunction, Request, Response } from 'express';
import {
  createGroup,
  deleteGroup,
  findGroup,
  findGroups,
  updateGroup,
  findGroupsList,
  checkGroup,
} from '../services/db/groups.services';
import { customResponse } from '../helpers/responce';
import { ParamsIdRequest } from '../types/requests/global.request.type';
import logger from '../helpers/logger';
import { DontHaveAccessError } from '../helpers/error';
import { findUsers } from '../services/db/users.services';

export const createGroupAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { title } = req.body;
  const { role } = req.user;

  logger.info(`Create Group Action: { title: ${title} } `);

  try {
    if (role !== 'admin') {
      throw new DontHaveAccessError();
    }
    const group = await createGroup({ title });

    return customResponse(res, 200, group);
  } catch (err) {
    logger.error('Create Group Action - Cannot create group', err);
    next(err);
  }
};

export const deleteGroupAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { role } = req.user;

  logger.info(`Delete Group Action: { id: ${id} } `);

  try {
    if (role !== 'admin') {
      throw new DontHaveAccessError();
    }

    const group = await checkGroup({ title: 'Администрация' });

    if (group?.id === id) {
      throw new DontHaveAccessError();
    }

    await deleteGroup(id);

    return customResponse(res, 200, { id });
  } catch (err) {
    logger.error('Delete Group Action - Cannot delete Group', err);
    next(err);
  }
};

export const getGroupAction = async (
  req: ParamsIdRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  logger.info(`Get Group Action: { id: ${id} } `);

  try {
    const group = await findGroup({ id });

    return customResponse(res, 200, group);
  } catch (err) {
    logger.error('Get Group Action - Cannot get Group', err);
    next(err);
  }
};

export const getAdministartionGroupAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('Get Administration Group Action');

  try {
    const group = await findGroup({ title: 'Администрация' });

    return customResponse(res, 200, group);
  } catch (err) {
    logger.error(
      'Get Administration Group Action - Cannot get Administration Group',
      err
    );
    next(err);
  }
};

export const getGroupsAction = async (
  req: ParamsIdRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  logger.info(`Get Groups Action: { id: ${id} } `);

  try {
    const groups = await findGroups();

    const users = await findUsers({ group_id: null });

    return customResponse(res, 200, { groups, users });
  } catch (err) {
    logger.error('Get Groups Action - Cannot get Groups', err);
    next(err);
  }
};

export const getGroupsListAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('Get Groups List Action');

  try {
    const groups = await findGroupsList();

    return customResponse(res, 200, groups);
  } catch (err) {
    logger.error('Get Groups List Action - Cannot get List Groups', err);
    next(err);
  }
};

export const updateGroupsAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { title } = req.body;
  const { id } = req.params;
  const { role } = req.user;

  logger.info(`Update Groups Action: { title: ${title} } `);

  try {
    if (role !== 'admin') {
      throw new DontHaveAccessError();
    }
    const group = await updateGroup(id, { title });

    return customResponse(res, 200, group);
  } catch (err) {
    logger.error('Update Groups Action - Cannot update Groups', err);
    next(err);
  }
};
