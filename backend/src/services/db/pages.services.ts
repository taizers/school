// eslint-disable-next-line @typescript-eslint/no-var-requires
const { User, Page } = require('../../db/models/index');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Op } = require('sequelize');
import {
  ResourceNotFoundError,
  EntityNotFoundError,
  DontHaveAccessError,
} from '../../helpers/error';

export const checkPage = async (where: object) => {
  const group = await Page.findOne({ where });

  if (!group) {
    throw new ResourceNotFoundError('Page');
  }
};

export const findPage = async (where: object) => {
  const page = await Page.findOne({
    where,
    include: [
      {
        model: User,
        as: 'user',
        attributes: {
          exclude: ['password', 'activationkey']
        },
      },
    ],
    row: true,
  });

  if (!page) {
    throw new ResourceNotFoundError('Страница');
  }

  return page;
};

export const findPagesList = async () => {
  const pages = await Page.findAll({
    row: true,
    where: {mainpage_id: null},
    order: [['title','DESC']],
    include: [
      {
        model: Page,
        as: 'subpages',
      },
    ],
  });

  if (!pages.length) {
    throw new ResourceNotFoundError('Страницы');
  }

  return pages;
};

export const createPage = async (payload: object) => {
  let page;

  try {
    page = await Page.create(payload);
  } catch (error) {
    throw new Error('Страница не создана');
  }

  return page;
};

export const deletePage = async (id: string) => {
  const result = await Page.destroy({ where: { id } });

  if (result === 0) {
    throw new EntityNotFoundError(id, 'Страница');
  }
};

// export const findUserGroups = async (userId: string) => {
//   const checklists = await Group.findAll({
//     where: { owner_id: userId },
//     include: [
//       {
//         model: Groupitem,
//         as: 'items',
//       },
//     ],
//   });

//   return checklists;
// };

export const updatePage = async (id: string, payload: object) => {
  const page = await Page.update(payload, {
    where: { id },
  });

  return page[1];
};
