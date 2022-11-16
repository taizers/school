import {
  GET_GALERY,
  GET_ALL_GALERIES_PAGINATED,
  DELETE_GALERY,
  GET_GALERY_SUCCESSED,
  GET_ALL_GALERIES_PAGINATED_SUCCESSED,
  DELETE_GALERY_SUCCESSED,
  SET_GALERIES_LOADING,
  UPDATE_GALERY_SUCCESSED,
  UPDATE_GALERY,
  CREATE_GALERY_SUCCESSED,
  CREATE_GALERY,
  SET_CREATE_GALERY_MODAL_STATUS,
  SET_UPDATE_GALERY_MODAL_STATUS,
  CLEAR_GALERY,
} from '../constants/types';
import { UpdateUserType, UserType, UsersType } from '../constants/tsSchemes';

export const getAllGaleriesPaginated = (page: number, limit: number) => ({
  type: GET_ALL_GALERIES_PAGINATED,
  payload: { page, limit },
});

export const getAllGaleriesPaginatedSuccessed = (data: any) => ({
  type: GET_ALL_GALERIES_PAGINATED_SUCCESSED,
  payload: data,
});

export const getGalery = (id: string) => ({
  type: GET_GALERY,
  payload: id,
});

export const getGalerySuccessed = (data: any) => ({
  type: GET_GALERY_SUCCESSED,
  payload: data,
});

export const updateGalery = (data: any, id: string) => ({
  type: UPDATE_GALERY,
  payload: { data, id },
});

export const updateGalerySuccessed = (data: any) => ({
  type: UPDATE_GALERY_SUCCESSED,
  payload: data,
});

export const deleteGalery = (id: string) => ({
  type: DELETE_GALERY,
  payload: id,
});

export const deleteGalerySuccessed = () => ({
  type: DELETE_GALERY_SUCCESSED,
});

export const createGalery = (data: any) => ({
  type: CREATE_GALERY,
  payload: data,
});

export const createGalerySuccessed = (data: any) => ({
  type: CREATE_GALERY_SUCCESSED,
  payload: data,
});

export const setCreateGaleryModalStatus = (isOpen: boolean) => ({
  type: SET_CREATE_GALERY_MODAL_STATUS,
  payload: isOpen,
});

export const setUpdateGaleryModalStatus = (isOpen: boolean) => ({
  type: SET_UPDATE_GALERY_MODAL_STATUS,
  payload: isOpen,
});

export const setGaleriesLoading = (is_loading: boolean) => ({
  type: SET_GALERIES_LOADING,
  payload: is_loading,
});

export const clearGalery = () => ({
  type: CLEAR_GALERY,
});
