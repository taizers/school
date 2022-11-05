import { NextFunction, Response, Request } from 'express';
import {
  findComments,
  createComment,
  deleteComment,
  checkComment,
} from '../services/db/comments.services';
import { customResponse } from '../helpers/responce';
import logger from '../helpers/logger';

export const createCommentAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { content } = req.body;
  const { id } = req.user;

  logger.info(
    `Create Comment Action: { 
      content: ${content}, 
      userId: ${id} 
    } `
  );

  try {
    const comment = await createComment({
      content,
      creator_id: id,
    });

    return customResponse(res, 200, comment);
  } catch (err) {
    logger.error('Create Comment Action - Cannot create comment', err);
    next(err);
  }
};

export const deleteCommentAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { id: userId, role } = req.user;

  logger.info(`Delete Comment Action: { id: ${id} } `);

  try {
    await checkComment(id, userId, role);
    await deleteComment(id);

    return customResponse(res, 200, { id });
  } catch (err) {
    logger.error('Delete Comment Action - Cannot delete comment', err);
    next(err);
  }
};

export const getCommentsAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, limit } = req.params;

  logger.info('Get Comments Action');

  try {
    const comments = await findComments(Number(page) - 1, Number(limit));

    return customResponse(res, 200, comments);
  } catch (err) {
    logger.error('Get Comments Action - Cannot get comments', err);
    next(err);
  }
};
