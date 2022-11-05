// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Galeryphoto } = require('../../db/models/index');
import path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs').promises;
import { EntityNotFoundError } from '../../helpers/error';

// export const getChecklistId = async (id: number | string) => {
//   const checklistitem = await Checklistitem.findByPk(id);

//   if (!checklistitem) {
//     throw new EntityNotFoundError(id.toString(), 'ChecklistItemModel');
//   }

//   return checklistitem.checklist_id;
// };

// export const createGaleryPhoto = async (payload: object) => {
//   let galeriesPhoto;

//   try {
//     galeriesPhoto = await Galeryphoto.create(payload);
//   } catch (error) {
//     throw new Error('Фото не создано');
//   }

//   return galeriesPhoto;
// };

export const createGaleryPhotos = async (payload: object) => {
  let galeryPhotos;

  try {
    galeryPhotos = await Galeryphoto.bulkCreate(payload);
  } catch (error) {
    console.log(error);
    throw new Error('Фото не созданы');
  }

  return galeryPhotos;
};

export const deleteGaleryPhoto = async (id: string) => {
  const result = await Galeryphoto.destroy({ where: { id } });

  if (result === 0) {
    throw new EntityNotFoundError(id, 'Фото');
  }
};

export const deleteGaleryPhotos = async (ids: Array<string>) => {
  const result = await Galeryphoto.destroy({ where: { id: ids } });

  if (result === 0) {
    throw new EntityNotFoundError(ids.join(' '), 'Фото');
  }
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
