// eslint-disable-next-line @typescript-eslint/no-var-requires
const { News, User } = require('../../db/models/index');
import {
  ResourceNotFoundError,
  EntityNotFoundError,
  DontHaveAccessError,
} from '../../helpers/error';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../../db/models';
import path from 'path';
import { editPath } from '../../utils/path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs').promises;

export const findNews = async (where: object) => {
  const news = await News.findOne({
    where,
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['username', 'avatar', 'id'],
      },
    ],
    row: true,
  });

  if (!news) {
    throw new ResourceNotFoundError('News');
  }
  news.cover = editPath(news.cover);

  return news;
};

export const getCoverNews = async (id: string) => {
  const news = await News.findOne({
    where: { id },
    attributes: ['cover'],
    row: true,
  });

  if (!news) {
    throw new ResourceNotFoundError('News');
  }

  return news;
};

export const createNews = async (payload: object) => {
  let news;

  try {
    news = await News.create(payload);
  } catch (error) {
    throw new Error('Could not create news');
  }

  return news;
};

export const deleteNews = async (id: string) => {
  const news = await getCoverNews(id);
  const result = await News.destroy({ where: { id } });

  if (result === 0) {
    throw new EntityNotFoundError(id, 'NewsModel');
  }
  if (news.cover) {
    await fs.unlink(news.cover);
  }
};

export const findAllNews = async (page: number, limit: number) => {
  const { count, rows } = await News.findAndCountAll({
    offset: page * limit,
    limit,
    attributes: {
      exclude: ['content'],
    },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['username', 'avatar', 'id'],
      },
    ],
    order: [['created_at', 'DESC']],
  });

  if (!rows.length) {
    throw new ResourceNotFoundError('News');
  }

  const news = rows?.map((item: any) => ({
    ...item?.dataValues,
    cover: editPath(item?.dataValues?.cover),
  }));

  const totalPages = !count ? 1 : Math.ceil(count / limit);

  return { totalPages, page: page + 1, news };
};

export const updateNews = async (
  id: string,
  payload: { cover: string; content: string; title: string; created_at?: Date }
) => {
  let news;

  try {
    let oldCoverPath;
    if (payload.cover) {
      const currentNews = await findNews({ id });
      oldCoverPath = currentNews.cover;
    }

    news = await News.update(payload, {
      where: { id },
      returning: true,
      plain: true,
    });

    if (oldCoverPath) {
      await fs.unlink(oldCoverPath);
    }
  } catch (error) {
    throw new Error('Could not update News');
  }

  return news[1];
};
