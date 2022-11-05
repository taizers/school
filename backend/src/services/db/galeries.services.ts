// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Galery, Galeryphoto } = require('../../db/models/index');
import {
  ResourceNotFoundError,
  EntityNotFoundError,
  DontHaveAccessError,
} from '../../helpers/error';

// export const checkNote = async (
//   id: number | string,
//   userId?: number | string
// ) => {
//   const note = await Note.findByPk(id);

//   if (!note) {
//     throw new ResourceNotFoundError('Note');
//   }

//   if (userId && note.owner_id !== userId) {
//     throw new DontHaveAccessError();
//   }
// };

export const findGalery = async (where: object) => {
  const galery = await Galery.findOne({
    where,
    include: [
      {
        model: Galeryphoto,
        as: 'items',
      },
    ],
    row: true,
  });

  if (!galery) {
    throw new ResourceNotFoundError('Галерея');
  }

  return galery;
};

export const createGalery = async (payload: object) => {
  let galery;

  try {
    galery = await Galery.create(payload);
  } catch (error) {
    console.log(error);
    throw new Error('Галерея не создана');
  }

  return galery;
};

export const deleteGalery = async (id: string) => {
  const result = await Galery.destroy({ where: { id } });

  if (result === 0) {
    throw new EntityNotFoundError(id, 'Галерея');
  }
};

export const findGaleries = async (page: number, limit: number) => {
  const { count, rows } = await Galery.findAndCountAll({
    offset: page * limit,
    limit,
    order: [['created_at', 'DESC']],
  });

  return { totalPages: Math.ceil(count / limit), page, galeries: rows };
};

export const updateGalery = async (id: string, payload: object) => {
  let galery;

  try {
    galery = await Galery.update(payload, {
      where: { id },
      returning: true,
      plain: true,
    });
  } catch (error) {
    throw new Error('Галерея не обновлена');
  }

  return galery[1];
};
