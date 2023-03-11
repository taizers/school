import {
  GET_PAGE,
  GET_PAGES,
  GET_PAGE_SUCCESSED,
  GET_PAGES_SUCCESSED,
  DELETE_PAGE,
  DELETE_PAGE_SUCCESSED,
  UPDATE_PAGE,
  UPDATE_PAGE_SUCCESSED,
  CREATE_PAGE,
  CREATE_PAGE_SUCCESSED,
  CLEAR_PAGE,
  GET_PAGES_LIST,
  GET_PAGES_LIST_SUCCESSED,
  SET_PAGES_LOADING,
  SET_CREATE_PAGE_MODAL_STATUS,
  SET_UPDATE_PAGE_MODAL_STATUS,
} from '../constants/types';

export const getPages = () => ({
  type: GET_PAGES,
});

export const getPagesSuccessed = (data: any) => ({
  type: GET_PAGES_SUCCESSED,
  payload: data,
});

export const getPagesList = () => ({
  type: GET_PAGES_LIST,
});

export const getPagesListSuccessed = (data: any) => ({
  type: GET_PAGES_LIST_SUCCESSED,
  payload: data,
});

export const getPage = (id: string) => ({
  type: GET_PAGE,
  payload: id,
});

export const getPageSuccessed = (data: any) => ({
  type: GET_PAGE_SUCCESSED,
  payload: data,
});

export const updatePage = (data: any, id: string) => ({
  type: UPDATE_PAGE,
  payload: { data, id },
});

export const updatePageSuccessed = (data: any) => ({
  type: UPDATE_PAGE_SUCCESSED,
  payload: data,
});

export const deletePage = (id: string, history: any) => ({
  type: DELETE_PAGE,
  payload: { id, history },
});

export const deletePageSuccessed = () => ({
  type: DELETE_PAGE_SUCCESSED,
});

export const createPage = (data: any) => ({
  type: CREATE_PAGE,
  payload: data,
});

export const createPageSuccessed = (data: any) => ({
  type: CREATE_PAGE_SUCCESSED,
  payload: data,
});

export const setUpdatePageModalStatus = (isOpen: boolean) => ({
  type: SET_UPDATE_PAGE_MODAL_STATUS,
  payload: isOpen,
});

export const setCreatePageModalStatus = (isOpen: boolean) => ({
  type: SET_CREATE_PAGE_MODAL_STATUS,
  payload: isOpen,
});

export const setPagesLoading = (isLoading: boolean) => ({
  type: SET_PAGES_LOADING,
  payload: isLoading,
});

export const clearPage = () => ({
  type: CLEAR_PAGE,
});
