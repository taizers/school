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
    row: true,
  });

  if (!group) {
    throw new ResourceNotFoundError('Группа');
  }

  return group.dataValues;
};

export const findStorageGroupsList = async () => {
  const groups = await Storagegroup.findAll();

  if (!groups.length) {
    throw new ResourceNotFoundError('Группа');
  }

  return groups;
};

export const findStorageGroups = async (page: number, limit: number) => {
  const { count, rows } = await Storagegroup.findAndCountAll({
    subQuery: false,
    offset: page * limit,
    limit,
    row: true,
    attributes: { 
      include: [[sequelize.fn("COUNT", sequelize.col("files.id")), "items"]] 
    },
    include: [
      {
        model: Storage,
        as: 'files',
        attributes: []
      },
    ],
    order: [['created_at', 'DESC']],
    group: ['storagegroup.id'],
  });

  const totalPages = !count.length ? 1 : Math.ceil(count?.length / limit);

  return {
    totalPages,
    page: page + 1,
    storageGroups: rows,
  };
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
