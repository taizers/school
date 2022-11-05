import { NextFunction, Request, Response } from 'express';
import {
  deletePage,
  createPage,
  findPagesList,
  findPage,
  updatePage,
  checkPage,
} from '../services/db/pages.services';
import { customResponse } from '../helpers/responce';
import logger from '../helpers/logger';
import { ParamsIdRequest } from '../types/requests/global.request.type';

export const createPageAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { content, title, mainpage_id } = req.body;
  const { id } = req.user;

  logger.info(
    `Create Page Action: { content: ${content}, title: ${title}, mainpage_id: ${mainpage_id} } `
  );

  try {
    if (mainpage_id) {
      await checkPage(mainpage_id);
    }

    const checklistItem = await createPage({
      content,
      creator_id: id,
      mainpage_id,
      title,
    });

    return customResponse(res, 200, checklistItem);
  } catch (err) {
    logger.error('Create Page Action - Cannot create Page', err);
    next(err);
  }
};

export const getPagesListAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('Get Pages List Action');

  try {
    const pages = await findPagesList();

    return customResponse(res, 200, pages);
  } catch (err) {
    logger.error('Get Pages List Action - Cannot get Pages List', err);
    next(err);
  }
};

export const deletePageAction = async (
  req: ParamsIdRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  logger.info(`Delete Page Action: { id: ${id} } `);

  try {
    await deletePage(id);

    return customResponse(res, 200, { id });
  } catch (err) {
    logger.error('Delete Page Action - Cannot delete Page', err);
    next(err);
  }
};

export const getPageAction = async (
  req: ParamsIdRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  logger.info(`Get Page Action: { id: ${id} } `);

  try {
    const page = await findPage({ id });

    return customResponse(res, 200, page);
  } catch (err) {
    logger.error('Get Page Action - Cannot get Page', err);
    next(err);
  }
};

export const updatePageAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { title, content, mainpage_id, created_at } = req.body;
  const { id } = req.params;

  logger.info(
    `Update Groups Action: { title: ${title}, content: ${content} } `
  );

  try {
    if (mainpage_id) {
      await checkPage(mainpage_id);
    }

    const page = await updatePage(id, { content, title, mainpage_id, created_at });

    return customResponse(res, 200, page);
  } catch (err) {
    logger.error('Update Page Action - Cannot update Page', err);
    next(err);
  }
};
