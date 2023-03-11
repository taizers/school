// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Galery, Galeryphoto, User } = require('../../db/models/index');
import {
  ResourceNotFoundError,
  EntityNotFoundError,
  DontHaveAccessError,
} from '../../helpers/error';
import { editPath } from '../../utils/path';

export const findGalery = async (where: object) => {
  const galery = await Galery.findOne({
    where,
    include: [
      {
        model: Galeryphoto,
        as: 'items',
      },
      {
        model: User,
        as: 'user',
        attributes: {
          exclude: ['password', 'activationkey'],
        },
      },
    ],
  });

  const jsonGalery = galery.toJSON();

  if (!jsonGalery) {
    throw new ResourceNotFoundError('Галерея');
  }

  const items = jsonGalery.items?.map((item: any) => ({
    ...item,
    name: editPath(item?.name),
  }));

  const cover = editPath(jsonGalery.cover);

  let avatar = null;

  if (galery.user?.avatar) {
    avatar = editPath(jsonGalery.user.avatar);
  }

  jsonGalery.user.avatar = avatar;
  jsonGalery.items = items;
  jsonGalery.cover = cover;

  return jsonGalery;
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

  const galeries = rows.map((item: any) => ({
    ...item?.dataValues,
    cover: editPath(item?.dataValues?.cover),
  }));

  const totalPages = !count ? 1 : Math.ceil(count / limit);

  return {
    totalPages,
    page: page + 1,
    galeries,
  };
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

  const cover = editPath(galery[1].cover);
  const resultGalery = { ...galery[1], cover };

  return resultGalery;
};
