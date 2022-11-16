import {
  GET_NEWS,
  GET_ALL_NEWS_PAGINATED,
  DELETE_NEWS,
  GET_NEWS_SUCCESSED,
  GET_ALL_NEWS_PAGINATED_SUCCESSED,
  DELETE_NEWS_SUCCESSED,
  SET_NEWS_LOADING,
  UPDATE_NEWS_SUCCESSED,
  UPDATE_NEWS,
  CREATE_NEWS_SUCCESSED,
  CREATE_NEWS,
  SET_NEWS_MODAL_STATUS,
  CLEAR_NEWS,
  GET_NEWS_WIDGET,
  GET_NEWS_WIDGET_SUCCESSED,
} from '../constants/types';
import { UpdateUserType, UserType, UsersType } from '../constants/tsSchemes';

export const getAllNewsPaginated = (page: number, limit: number) => ({
  type: GET_ALL_NEWS_PAGINATED,
  payload: { page, limit },
});

export const getAllNewsPaginatedSuccessed = (data: any) => ({
  type: GET_ALL_NEWS_PAGINATED_SUCCESSED,
  payload: data,
});

export const getNews = (id: string) => ({
  type: GET_NEWS,
  payload: id,
});

export const getNewsSuccessed = (data: any) => ({
  type: GET_NEWS_SUCCESSED,
  payload: data,
});

export const getNewsWidget = (count: number) => ({
  type: GET_NEWS_WIDGET,
  payload: { page: 1, limit: count },
});

export const getNewsWidgetSuccessed = (data: any) => ({
  type: GET_NEWS_WIDGET_SUCCESSED,
  payload: data,
});

export const updateNews = (data: any, id: string) => ({
  type: UPDATE_NEWS,
  payload: { data, id },
});

export const updateNewsSuccessed = (data: any) => ({
  type: UPDATE_NEWS_SUCCESSED,
  payload: data,
});

export const deleteNews = (id: string) => ({
  type: DELETE_NEWS,
  payload: id,
});

export const deleteNewsSuccessed = () => ({
  type: DELETE_NEWS_SUCCESSED,
});

export const createNews = (data: any) => ({
  type: CREATE_NEWS,
  payload: data,
});

export const createNewsSuccessed = (data: any) => ({
  type: CREATE_NEWS_SUCCESSED,
  payload: data,
});

export const setNewsModalStatus = (isOpen: boolean) => ({
  type: SET_NEWS_MODAL_STATUS,
  payload: isOpen,
});

export const setNewsLoading = (is_loading: boolean) => ({
  type: SET_NEWS_LOADING,
  payload: is_loading,
});

export const clearNews = () => ({
  type: CLEAR_NEWS,
});
