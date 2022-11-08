import { NextFunction, Response } from 'express';
import {
  findNews,
  findAllNews,
  createNews,
  deleteNews,
  updateNews,
} from '../services/db/news.services';
import { customResponse } from '../helpers/responce';
import logger from '../helpers/logger';
import { ParamsIdRequest } from '../types/requests/global.request.type';
import { Op } from 'sequelize';

export const createNewsAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { title, content, created_at } = req.body;
  const { id } = req.user;
  const { path } = req.file;

  console.log(req.file);

  logger.info(
    `Create News Action: { title: ${title}, content: ${content}, userId: ${id}, path: ${path}, created_at: ${created_at} } `
  );

  try {
    const news = await createNews({
      title,
      content,
      cover: path,
      creator_id: id,
      created_at,
    });

    return customResponse(res, 200, news);
  } catch (err) {
    logger.error('Create News Action - Cannot create news', err);
    next(err);
  }
};

export const deleteNewsAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  logger.info(`Delete News Action: { id: ${id} } `);

  try {
    await deleteNews(id);

    return customResponse(res, 200, { id });
  } catch (err) {
    logger.error('Delete News Action - Cannot delete news', err);
    next(err);
  }
};

export const getNewsAction = async (
  req: ParamsIdRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  logger.info(`Get News Action: { id: ${id} } `);

  try {
    const news = await findNews({ id });

    return customResponse(res, 200, news);
  } catch (err) {
    logger.error('Get News Action - Cannot get news', err);
    next(err);
  }
};

export const getAllNewsAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { page, limit } = req.query;

  logger.info(`Get All News Action`);

  try {
    const news = await findAllNews(page - 1, limit);

    return customResponse(res, 200, news);
  } catch (err) {
    logger.error('Get all News Action - Cannot all get news', err);
    next(err);
  }
};

export const updateNewsAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { title, content, created_at } = req.body;
  const { id } = req.params;
  const { path } = req.file;

  logger.info(
    `Update News Action: { title: ${title}, content: ${content}, path: ${path}, created_at: ${created_at} } `
  );

  try {
    const news = await updateNews(id, {
      title,
      content,
      cover: path,
      created_at,
    });

    return customResponse(res, 200, news);
  } catch (err) {
    logger.error('Update News Action - Cannot update news', err);
    next(err);
  }
};
