// eslint-disable-next-line @typescript-eslint/no-var-requires
const { User, Storage } = require('../../db/models/index');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sequelize = require('sequelize');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs').promises;
import {
  ResourceNotFoundError,
  EntityNotFoundError,
  DontHaveAccessError,
} from '../../helpers/error';
import { editPath } from '../../utils/path';

export const findStorageList = async (
  group_id: number,
  page: number,
  limit: number
) => {
  const { count, rows } = await Storage.findAndCountAll({
    offset: page * limit,
    limit,
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['username', 'id', 'avatar'],
      },
    ],
    where: { storagegroup_id: group_id },
    order: [['created_at', 'DESC']],
  });

  const storages =
    rows?.map((item: any) => ({
      ...item?.dataValues,
      name: editPath(item?.dataValues.name),
    })) || [];

  const totalPages = !count ? 1 : Math.ceil(count / limit);

  return {
    totalPages,
    page: page + 1,
    storages,
  };
};

export const createStorage = async (payload: object) => {
  let storage;

  try {
    storage = await Storage.create(payload);
    storage.name = editPath(storage.name);
  } catch (error) {
    console.log(error);
    throw new Error('Файл не создан');
  }

  return storage;
};

export const deleteStorage = async (id: string) => {
  const photo = await Storage.findOne({ where: { id }, attributes: ['name'] });

  if (!photo) {
    throw new ResourceNotFoundError('Файл');
  }

  await fs.unlink(photo?.name);

  const result = await Storage.destroy({ where: { id } });

  if (result === 0) {
    throw new EntityNotFoundError(id, 'Файл');
  }
};

export const deleteGroupsStorages = async (id: number) => {
  const files = await Storage.findAll({
    where: { storagegroup_id: id },
    attributes: ['name', 'id'],
  });

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
