import { NextFunction, Response } from 'express';
import {
  createStorage,
  deleteStorage,
} from '../services/db/storages.services';
import { customResponse } from '../helpers/responce';
import { ParamsIdRequest } from '../types/requests/global.request.type';
import logger from '../helpers/logger';

export const createStorageAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { title } = req.body;
  const { id } = req.user;
  const { mimetype, size, path } = req.file;

  logger.info(`Create Storage Action: { title: ${title}, mimetype: ${mimetype}, size: ${size}, path: ${path}, userId: ${id} } `);

  try {
    const file = await createStorage({ title, type: mimetype, size, creator_id: id, name: path});

    return customResponse(res, 200, file);
  } catch (err) {
    logger.error('Create Storage Action - Cannot storage create', err);
    next(err);
  }
};

export const deleteStorageAction = async (
  req: ParamsIdRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  logger.info(`Delete Storage Action: { id: ${id} } `);

  try {
    await deleteStorage(id);

    return customResponse(res, 200, { id });
  } catch (err) {
    logger.error('Delete Storage Action - Cannot delete Storage', err);
    next(err);
  }
};
