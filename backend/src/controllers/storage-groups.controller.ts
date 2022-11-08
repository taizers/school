import { NextFunction, Request, Response } from 'express';
import {
  createStorageGroup,
  deleteStorageGroup,
  findStorageGroup,
  findStorageGroupsList,
  updateStorageGroup,
} from '../services/db/storage-groups.services';
import { customResponse } from '../helpers/responce';
import { ParamsIdRequest } from '../types/requests/global.request.type';
import logger from '../helpers/logger';
import {
  CreateStorageGroupRequest,
  UpdateStorageGroupRequest,
} from '../types/requests/storage-groups.request.type';
import { deleteGroupsStorages } from '../services/db/storages.services';

export const createStorageGroupAction = async (
  req: CreateStorageGroupRequest,
  res: Response,
  next: NextFunction
) => {
  const { title, created_at } = req.body;

  logger.info(`Create Storage Group Action: { title: ${title}, created_at: ${created_at} } `);

  try {
    const group = await createStorageGroup({ title, created_at });

    return customResponse(res, 200, group);
  } catch (err) {
    logger.error(
      'Create Storage Group Action - Cannot storage create group',
      err
    );
    next(err);
  }
};

export const deleteStorageGroupAction = async (
  req: ParamsIdRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  logger.info(`Delete Storage Group Action: { id: ${id} } `);

  try {
    await deleteGroupsStorages(Number(id));
    await deleteStorageGroup(id);

    return customResponse(res, 200, { id });
  } catch (err) {
    logger.error(
      'Delete Storage Group Action - Cannot delete Storage Group',
      err
    );
    next(err);
  }
};

export const getStorageGroupAction = async (
  req: ParamsIdRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  logger.info(`Get Storage Group Action: { id: ${id} } `);

  try {
    const group = await findStorageGroup({ id });

    return customResponse(res, 200, group);
  } catch (err) {
    logger.error('Get Storage Group Action - Cannot get Storage Group', err);
    next(err);
  }
};

export const getStorageGroupsListAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { page, limit } = req.query;

  logger.info(
    `Get Storage Groups Action: { page: ${
      Number(page) - 1
    }, limit: ${limit}} `
  );

  try {
    const groups = await findStorageGroupsList(Number(page) - 1, Number(limit));

    return customResponse(res, 200, groups);
  } catch (err) {
    logger.error('Get Storage Groups Action - Cannot get Storage Groups', err);
    next(err);
  }
};

export const updateStorageGroupAction = async (
  req: UpdateStorageGroupRequest,
  res: Response,
  next: NextFunction
) => {
  const { title } = req.body;
  const { id } = req.params;

  logger.info(`Update Storage Group Action: { title: ${title}, id: ${id} } `);

  try {
    const group = await updateStorageGroup(id, { title });

    return customResponse(res, 200, group);
  } catch (err) {
    logger.error(
      'Update Storage Group Action - Cannot update storage Group',
      err
    );
    next(err);
  }
};
