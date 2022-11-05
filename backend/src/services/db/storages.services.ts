// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Storagegroup, Storage } = require('../../db/models/index');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sequelize = require('sequelize');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs').promises;
import {
  ResourceNotFoundError,
  EntityNotFoundError,
  DontHaveAccessError,
} from '../../helpers/error';

export const findStorageList = async (page: number, limit: number, group_id: number) => {
  const { count, rows } = await Storage.findAndCountAll({
    offset: page * limit,
    limit,
    where: { group_id },
    row: true,
    order: [['created_at', 'DESC']],
  });

  if (!rows.length) {
    throw new ResourceNotFoundError('Файлы');
  }

  return { totalPages: Math.ceil(count / limit), page: page + 1, storages: rows };
};

export const createStorage = async (payload: object) => {
  let storage;

  try {
    storage = await Storage.create(payload);
  } catch (error) {
    throw new Error('Файл не создан');
  }

  return storage;
};

export const deleteStorage = async (id: string) => {
  const photo = await Storage.findOne({ where: { id }, attributes: ['name'] });

  await fs.unlink(photo.name);
  
  const result = await Storage.destroy({ where: { id } });

  if (result === 0) {
    throw new EntityNotFoundError(id, 'Файл');
  }
};

export const deleteGroupsStorages = async (id: number) => {
  const files = await Storage.findAll({ where: { group_id: id }, attributes: ['name', 'id'] });

  if (!files.length) {
    return;
  }

  await Promise.all(
    files.map(async (item: { name: string; id: number }) => {
      await fs.unlink(item.name);

      const result = await Storage.destroy({ where: { id: item.id } });

      if (result === 0) {
        throw new EntityNotFoundError(item.id.toString(), 'Фото');
      }
    })
  );
};
