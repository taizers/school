import { Response, NextFunction } from 'express';
import {
  findGalery,
  findGaleries,
  createGalery,
  deleteGalery,
  updateGalery,
} from '../services/db/galeries.services';
import {
  createGaleryPhotos,
  deleteGaleryPhotos,
  deleteGalerysPhotos
} from '../services/db/galeries-photos.services';
import { customResponse } from '../helpers/responce';
import { ParamsIdRequest } from '../types/requests/global.request.type';
import logger from '../helpers/logger';

export const createGaleryAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { title } = req.body;
  const { id: userId } = req.user;

  logger.info(
    `Create Galery Action: { title: ${title}, userId: ${userId} } `
  );

  try {
    const createdGalery = await createGalery({
      title,
      cover: req.files[0]?.filename,
      creator_id: userId,
    });

    const photos = req.files?.map((item:any) => ({name: item.filename, galery_id: createdGalery.id}));

    console.log(photos);

    if (photos) {
      await createGaleryPhotos(photos);
    }

    const galery = await findGalery({ id: createdGalery.id });

    return customResponse(res, 200, galery);
  } catch (err) {
    logger.error('Create Galery Action - Cannot create galery', err);
    next(err);
  }
};

export const deleteGaleryAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  logger.info(`Delete Galery Action: { id: ${id} } `);

  try {
    await deleteGalerysPhotos(id);

    return customResponse(res, 200, { id });
  } catch (err) {
    logger.error('Delete Galery Action - Cannot delete galery', err);
    next(err);
  }
};

export const getGaleryAction = async (
  req: ParamsIdRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  logger.info(`Get Galery Action: { id: ${id} } `);

  try {
    const galery = await findGalery({ id });

    return customResponse(res, 200, galery);
  } catch (err) {
    logger.error('Get Galery Action - Cannot get galery', err);
    next(err);
  }
};

export const getGaleriesAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { page, limit } = req.query;

  logger.info('Get Galeries Action');

  try {
    const galeries = await findGaleries(page - 1, limit);

    return customResponse(res, 200, galeries);
  } catch (err) {
    logger.error('Get Galeries Action - Cannot get note', err);
    next(err);
  }
};

export const updateGaleryAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { title, deleted, cover } = req.body;
  const { id } = req.params;

  logger.info(
    `Update Galery Action: { title: ${title}, deleted: ${deleted}, cover: ${cover} } `
  );

  try {
    if (title || cover) {
      await updateGalery(id, {title, cover});
    }

    if (req.files) {
      const filenames = req.files.map((item: any) => ({name: item.filename, galery_id: id}));

      await createGaleryPhotos(filenames);
    }

    if (deleted) {
      const ids = deleted.split(' ');

      await deleteGaleryPhotos(ids);
    } 

    const galery = await findGalery({ id });

    return customResponse(res, 200, galery);
  } catch (err) {
    logger.error('Update Galery Action - Cannot update galery', err);
    next(err);
  }
};
