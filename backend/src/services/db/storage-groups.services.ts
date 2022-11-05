// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Storagegroup, Storage } = require('../../db/models/index');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sequelize = require('sequelize');
import {
  ResourceNotFoundError,
  EntityNotFoundError,
  DontHaveAccessError,
} from '../../helpers/error';

export const findStorageGroup = async (where: object) => {
  const group = await Storagegroup.findOne({
    where,
    include: [
      {
        model: Storage,
        as: 'files',
      },
    ],
    row: true,
  });

  if (!group) {
    throw new ResourceNotFoundError('Группа');
  }

  return group;
};

export const findStorageGroupsList = async (page: number, limit: number) => {
  const { count, rows } = await Storagegroup.findAndCountAll({
    offset: page * limit,
    limit,
    row: true,
    include: [
      {
        model: Storage,
        attributes: [[sequelize.fn('COUNT', 'id'), 'items']]
      },
    ],
    order: [['created_at', 'DESC']],
  });

  if (!rows.length) {
    throw new ResourceNotFoundError('Группы файлов');
  }

  return { totalPages: Math.ceil(count / limit), page: page + 1, storageGroups: rows };
};

export const createStorageGroup = async (payload: object) => {
  let group;

  try {
    group = await Storagegroup.create(payload);
  } catch (error) {
    throw new Error('Группа файлов не создана');
  }

  return group;
};

export const deleteStorageGroup = async (id: string) => {
  const result = await Storagegroup.destroy({ where: { id } });

  if (result === 0) {
    throw new EntityNotFoundError(id, 'Группа файлов');
  }
};

export const updateStorageGroup = async (id: string, payload: object) => {
  const group = await Storagegroup.update(payload, {
    where: { id },
  });

  return group[1];
};
