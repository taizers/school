// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Galeryphoto } = require('../../db/models/index');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs').promises;
import { EntityNotFoundError } from '../../helpers/error';

export const createGaleryPhotos = async (payload: object) => {
  let galeryPhotos;

  try {
    galeryPhotos = await Galeryphoto.bulkCreate(payload);
  } catch (error) {
    throw new Error('Фото не созданы');
  }

  return galeryPhotos;
};

export const findGaleryPhoto = async (where: object) => {
  let galeryPhoto;

  try {
    galeryPhoto = await Galeryphoto.findOne({
      where,
      attributes: ['name'],
    });
  } catch (error) {
    throw new Error('Фото не созданы');
  }

  return galeryPhoto;
};

export const deleteGaleryPhotos = async (ids: Array<string>) => {
  await Promise.all(
    ids.map(async (item) => {
      const photo = await Galeryphoto.findOne({
        where: { id: item },
        attributes: ['name'],
      });

      await fs.unlink(photo.name);

      const result = await Galeryphoto.destroy({ where: { id: item } });

      if (result === 0) {
        throw new EntityNotFoundError(item, 'Фото');
      }
    })
  );
};

export const deleteGalerysPhotos = async (id: number) => {
  const photos = await Galeryphoto.findAll({ where: { galery_id: id } });

  if (!photos.length) {
    return;
  }

  await Promise.all(
    photos.map(async (item: { name: string; id: number }) => {
      await fs.unlink(item.name);

      const result = await Galeryphoto.destroy({ where: { id: item.id } });

      if (result === 0) {
        throw new EntityNotFoundError(item.id.toString(), 'Фото');
      }
    })
  );
};
