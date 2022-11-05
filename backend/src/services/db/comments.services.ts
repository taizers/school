// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Comment, User } = require('../../db/models/index');
import {
  EntityNotFoundError,
  ResourceNotFoundError,
  DontHaveAccessError,
} from '../../helpers/error';

export const checkComment = async (
  id: number | string,
  userId?: number | string,
  role?: string
) => {
  const comment = await Comment.findByPk(id);

  if (!comment) {
    throw new ResourceNotFoundError('Comment');
  }

  if ((userId && (comment.cretor_id !== userId)) && (role && (role !== 'admin'))) {
    throw new DontHaveAccessError();
  }
};

export const createComment = async (payload: object) => {
  let comment;

  try {
    comment = await Comment.create(payload);
  } catch (error) {
    throw new Error('Could not create comment');
  }

  return comment;
};

export const deleteComment = async (id: string) => {
  const result = await Comment.destroy({ where: { id } });

  if (result === 0) {
    throw new EntityNotFoundError(id, 'CommentModel');
  }
};

export const findComments = async (page: number, limit: number) => {
  const comments = await Comment.findAll({
    offset: page * limit,
    limit,
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['username', 'avatar', 'id'],
      },
    ],
    order: [['created_at', 'DESC']],
  });

  return comments;
};
